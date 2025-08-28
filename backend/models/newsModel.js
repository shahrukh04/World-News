import mongoose from 'mongoose';
import slugify from 'slugify';

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  category: { type: String, required: true, enum: ['India', 'World', 'Health', 'Jobs', 'Sports', 'Technology', 'IPO', 'Business', 'Entertainment', 'Other'] },
  description: { type: String, required: true },
  content: { type: String, required: true }, // Full article content
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
  
  // Calculate reading time and word count
  if (this.content) {
    const words = this.content.split(/\s+/).length;
    this.wordCount = words;
    this.readingTime = Math.ceil(words / 200); // Average reading speed
  }
  
  // Set published date
  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  next();
});

const News = mongoose.model('News', newsSchema);

export default News;
