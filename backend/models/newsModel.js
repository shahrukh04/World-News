import mongoose from 'mongoose';
import slugify from 'slugify';
import zlib from 'zlib';

const CONTENT_COMPRESSION = 'gzip';
const CONTENT_CHUNK_BYTES = 32 * 1024;

const compressContentToChunks = (content) => {
  const input = Buffer.from(content || '', 'utf8');
  const chunks = [];

  for (let offset = 0; offset < input.length; offset += CONTENT_CHUNK_BYTES) {
    const slice = input.subarray(offset, offset + CONTENT_CHUNK_BYTES);
    const compressed = zlib.gzipSync(slice, { level: zlib.constants.Z_BEST_COMPRESSION });
    chunks.push({
      index: chunks.length,
      data: compressed,
      originalSize: slice.length,
      compressedSize: compressed.length,
    });
  }

  return {
    compression: CONTENT_COMPRESSION,
    chunkSizeBytes: CONTENT_CHUNK_BYTES,
    originalSizeBytes: input.length,
    chunks,
  };
};

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  category: { type: String, required: true, enum: ['India', 'World', 'Health', 'Jobs', 'Sports', 'Technology', 'IPO', 'Business', 'Entertainment', 'Other'] },
  description: { type: String, required: true },
  content: { type: String, required: false }, // transient input; persisted as compressed chunks
  contentCompression: { type: String, enum: [CONTENT_COMPRESSION], default: CONTENT_COMPRESSION },
  contentChunkSizeBytes: { type: Number, default: CONTENT_CHUNK_BYTES },
  contentOriginalSizeBytes: { type: Number, default: 0 },
  contentCompressedChunks: [
    {
      index: { type: Number, required: true },
      data: { type: Buffer, required: true },
      originalSize: { type: Number, required: true },
      compressedSize: { type: Number, required: true },
    },
  ],
  image: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // SEO Fields
  metaTitle: { type: String, maxlength: 60 },
  metaDescription: { type: String, maxlength: 160 },
  keywords: [{ type: String }],
  canonicalUrl: { type: String },
  ogTitle: { type: String, maxlength: 60 },
  ogDescription: { type: String, maxlength: 160 },
  ogImage: { type: String },
  twitterTitle: { type: String, maxlength: 60 },
  twitterDescription: { type: String, maxlength: 160 },
  twitterImage: { type: String },
  
  // Content SEO
  readingTime: { type: Number }, // in minutes
  wordCount: { type: Number },
  seoScore: { type: Number, min: 0, max: 100 },
  
  // Publishing
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  publishedAt: { type: Date },
  featured: { type: Boolean, default: false },
  trending: { type: Boolean, default: false },
  
  // Analytics
  views: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  
  // Additional SEO
  focusKeyword: { type: String },
  relatedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'News' }],
  tags: [{ type: String }],
  excerpt: { type: String, maxlength: 300 }
}, { timestamps: true });

// Auto-generate slug before saving
newsSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  
  // Auto-generate meta fields if not provided
  if (!this.metaTitle) {
    this.metaTitle = this.title.length > 60 ? this.title.substring(0, 57) + '...' : this.title;
  }
  
  if (!this.metaDescription) {
    this.metaDescription = this.description.length > 160 ? this.description.substring(0, 157) + '...' : this.description;
  }

  if (this.isModified('content') && typeof this.content === 'string' && this.content.trim()) {
    const rawContent = this.content;

    const words = rawContent.split(/\s+/).filter(Boolean).length;
    this.wordCount = words;
    this.readingTime = Math.max(1, Math.ceil(words / 200));

    const compressed = compressContentToChunks(rawContent);
    this.contentCompression = compressed.compression;
    this.contentChunkSizeBytes = compressed.chunkSizeBytes;
    this.contentOriginalSizeBytes = compressed.originalSizeBytes;
    this.contentCompressedChunks = compressed.chunks;

    this.content = undefined;
  }
  
  // Set published date
  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  next();
});

const News = mongoose.model('News', newsSchema);

export default News;
