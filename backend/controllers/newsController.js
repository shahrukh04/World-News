import News from '../models/newsModel.js';
import mongoose from 'mongoose';

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
      keywords: keywords || [],
      focusKeyword,
      canonicalUrl,
      ogTitle,
      ogDescription,
      twitterTitle,
      twitterDescription,
      // Content fields
      tags: tags || [],
      status: status || 'draft',
      featured: featured || false,
      trending: trending || false
    });

  const createdNews = await news.save();
  // trigger rebuild webhook (non-blocking)
  triggerRebuildWebhook();
  res.status(201).json(createdNews);
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
    
    let filter = { status };
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
    const idOrSlug = req.params.id;
    let news;
    if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
      news = await News.findById(idOrSlug);
    } else {
      news = await News.findOne({ slug: idOrSlug });
    }

    if (news) {
      res.json(news);
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

    // Update fields
    news.title = title || news.title;
    news.category = category || news.category;
    news.description = description || news.description;
    news.content = content || news.content;
    news.excerpt = excerpt || news.excerpt;
    
    // Update SEO fields
    news.metaTitle = metaTitle || news.metaTitle;
    news.metaDescription = metaDescription || news.metaDescription;
    news.keywords = keywords || news.keywords;
    news.focusKeyword = focusKeyword || news.focusKeyword;
    news.canonicalUrl = canonicalUrl || news.canonicalUrl;
    news.ogTitle = ogTitle || news.ogTitle;
    news.ogDescription = ogDescription || news.ogDescription;
    news.twitterTitle = twitterTitle || news.twitterTitle;
    news.twitterDescription = twitterDescription || news.twitterDescription;
    
    // Update content fields
    news.tags = tags || news.tags;
    news.status = status || news.status;
    news.featured = featured !== undefined ? featured : news.featured;
    news.trending = trending !== undefined ? trending : news.trending;
    
    // Update image if provided
    if (req.file) {
      news.image = req.file.filename;
    }

  const updatedNews = await news.save();
  // trigger rebuild webhook (non-blocking)
  triggerRebuildWebhook();
  res.json(updatedNews);
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
