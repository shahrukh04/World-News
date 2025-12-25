import News from '../models/newsModel.js';
import zlib from 'zlib';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Helper: trigger a rebuild/deploy webhook (non-blocking)
const triggerRebuildWebhook = async () => {
  try {
    const hook = process.env.SITEMAP_REBUILD_HOOK;
    if (!hook) return;
    // Use global fetch (Node 18+). Fire-and-forget.
    fetch(hook, { method: 'POST' }).catch(err => console.warn('Rebuild webhook error:', err.message));
  } catch (e) {
    console.warn('Error triggering rebuild webhook:', e.message || e);
  }
};

const parseJsonArrayField = (value) => {
  if (value === undefined || value === null || value === '') return undefined;
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string') return undefined;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
};

const parseBooleanField = (value) => {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value !== 0;
  if (typeof value !== 'string') return undefined;
  const normalized = value.trim().toLowerCase();
  if (normalized === 'true') return true;
  if (normalized === 'false') return false;
  return undefined;
};

const getAuthUserFromRequest = async (req) => {
  const authHeader = req.headers?.authorization;
  if (!authHeader || typeof authHeader !== 'string') return null;
  if (!authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    return user || null;
  } catch {
    return null;
  }
};

const decompressNewsContentChunks = (newsDoc) => {
  const compression = newsDoc?.contentCompression;
  const chunks = newsDoc?.contentCompressedChunks || [];
  if (!Array.isArray(chunks) || chunks.length === 0) return [];

  const sorted = [...chunks].sort((a, b) => (a.index ?? 0) - (b.index ?? 0));

  if (compression !== 'gzip') return [];

  return sorted.map((chunk) => zlib.gunzipSync(chunk.data).toString('utf8'));
};

const getNewsContentChunksForResponse = (newsDoc) => {
  const decompressedChunks = decompressNewsContentChunks(newsDoc);
  if (decompressedChunks.length > 0) return decompressedChunks;
  if (typeof newsDoc?.content === 'string' && newsDoc.content.trim()) return [newsDoc.content];
  return [];
};

const toSafeNewsResponse = (newsDoc) => {
  const obj = newsDoc?.toObject ? newsDoc.toObject() : { ...newsDoc };
  obj.contentChunks = getNewsContentChunksForResponse(newsDoc);
  delete obj.contentCompressedChunks;
  delete obj.contentCompression;
  delete obj.contentChunkSizeBytes;
  delete obj.contentOriginalSizeBytes;
  return obj;
};

// Create news (admin only)
export const createNews = async (req, res) => {
  const { 
    title, 
    category, 
    description, 
    content,
    excerpt,
    metaTitle,
    metaDescription,
    keywords,
    focusKeyword,
    canonicalUrl,
    ogTitle,
    ogDescription,
    twitterTitle,
    twitterDescription,
    tags,
    status,
    featured,
    trending
  } = req.body;
  
  const image = req.file ? req.file.filename : null;

  try {
    // Validate required fields
    if (!title || !category || !description || !content) {
      return res.status(400).json({ 
        message: 'Missing required fields: title, category, description, and content are required' 
      });
    }

    const keywordsArray = parseJsonArrayField(keywords) ?? [];
    const tagsArray = parseJsonArrayField(tags) ?? [];
    const featuredBool = parseBooleanField(featured) ?? false;
    const trendingBool = parseBooleanField(trending) ?? false;

    const news = new News({
      title,
      category,
      description,
      content,
      excerpt,
      image,
      author: req.user._id,
      // SEO Fields
      metaTitle,
      metaDescription,
      keywords: keywordsArray,
      focusKeyword,
      canonicalUrl,
      ogTitle,
      ogDescription,
      twitterTitle,
      twitterDescription,
      // Content fields
      tags: tagsArray,
      status: status || 'draft',
      featured: featuredBool,
      trending: trendingBool
    });

    const createdNews = await news.save();
    // trigger rebuild webhook (non-blocking)
    triggerRebuildWebhook();
    res.status(201).json(toSafeNewsResponse(createdNews));
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(400).json({ 
      message: 'Invalid news data',
      error: error.message,
      details: error.errors ? Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message
      })) : null
    });
  }
};

// Get all news with pagination and optimization
export const getNews = async (req, res) => {
  try {
    const { category, page = 1, limit = 10, status = 'published' } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    const requestedStatus = typeof status === 'string' ? status : 'published';
    if (requestedStatus !== 'published') {
      const user = await getAuthUserFromRequest(req);
      if (!user) {
        return res.status(401).json({ message: 'Not authorized' });
      }
    }

    const filter = {};
    if (requestedStatus !== 'all') {
      filter.status = requestedStatus;
    }
    if (category && category !== 'all') {
      filter.category = category;
    }

    // Only select necessary fields for list view to reduce data transfer
    const news = await News.find(filter)
      .select('title slug category description image author createdAt updatedAt status featured trending views likes shares excerpt')
      .populate('author', 'username firstName lastName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean(); // Use lean() for better performance

    // Get total count for pagination
    const total = await News.countDocuments(filter);
    
    res.json({
      news,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalItems: total,
        itemsPerPage: limitNum,
        hasNextPage: pageNum < Math.ceil(total / limitNum),
        hasPrevPage: pageNum > 1
      }
    });
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ 
      message: 'Database connection error', 
      error: error.message 
    });
  }
};

// Get news by id
export const getNewsById = async (req, res) => {
  try {
    const identifier = req.params.id;
    const isObjectId = mongoose.Types.ObjectId.isValid(identifier);
    const news = isObjectId
      ? await News.findById(identifier)
      : await News.findOne({ slug: identifier });

    if (news) {
      res.json(toSafeNewsResponse(news));
    } else {
      res.status(404).json({ message: 'News not found' });
    }
  } catch (error) {
    console.error('Error fetching news by ID:', error.message);
    res.status(500).json({ 
      message: 'Database connection error', 
      error: error.message 
    });
  }
};

// Delete news by id (admin only)
export const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (news) {
  await news.remove();
  // trigger rebuild webhook (non-blocking)
  triggerRebuildWebhook();
  res.json({ message: 'News removed' });
    } else {
      res.status(404).json({ message: 'News not found' });
    }
  } catch (error) {
    console.error('Error deleting news:', error.message);
    res.status(500).json({ 
      message: 'Database connection error', 
      error: error.message 
    });
  }
};

// Update news by id (admin only)
export const updateNews = async (req, res) => {
  const { 
    title, 
    category, 
    description, 
    content,
    excerpt,
    metaTitle,
    metaDescription,
    keywords,
    focusKeyword,
    canonicalUrl,
    ogTitle,
    ogDescription,
    twitterTitle,
    twitterDescription,
    tags,
    status,
    featured,
    trending
  } = req.body;
  
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    const keywordsArray = parseJsonArrayField(keywords);
    const tagsArray = parseJsonArrayField(tags);
    const featuredBool = parseBooleanField(featured);
    const trendingBool = parseBooleanField(trending);

    // Update fields
    news.title = title || news.title;
    news.category = category || news.category;
    news.description = description || news.description;
    if (content !== undefined) {
      news.content = content;
    }
    news.excerpt = excerpt || news.excerpt;
    
    // Update SEO fields
    news.metaTitle = metaTitle || news.metaTitle;
    news.metaDescription = metaDescription || news.metaDescription;
    if (keywordsArray) news.keywords = keywordsArray;
    news.focusKeyword = focusKeyword || news.focusKeyword;
    news.canonicalUrl = canonicalUrl || news.canonicalUrl;
    news.ogTitle = ogTitle || news.ogTitle;
    news.ogDescription = ogDescription || news.ogDescription;
    news.twitterTitle = twitterTitle || news.twitterTitle;
    news.twitterDescription = twitterDescription || news.twitterDescription;
    
    // Update content fields
    if (tagsArray) news.tags = tagsArray;
    news.status = status || news.status;
    if (featuredBool !== undefined) news.featured = featuredBool;
    if (trendingBool !== undefined) news.trending = trendingBool;
    
    // Update image if provided
    if (req.file) {
      news.image = req.file.filename;
    }

    const updatedNews = await news.save();
    // trigger rebuild webhook (non-blocking)
    triggerRebuildWebhook();
    res.json(toSafeNewsResponse(updatedNews));
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(400).json({ 
      message: 'Error updating news',
      error: error.message,
      details: error.errors ? Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message
      })) : null
    });
  }
};
