import mongoose from 'mongoose';
import dotenv from 'dotenv';
import News from './models/newsModel.js';
import User from './models/userModel.js';
import crypto from 'crypto';

// Load environment variables
const NODE_ENV = process.env.NODE_ENV || 'development';
if (NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config({ path: '.env.local' });
}
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Clear mock data
const clearMockData = async () => {
  try {
    await connectDB();
    
    // Delete all articles except the manually uploaded JSW Steel IPO article
    const result = await News.deleteMany({
      title: { $ne: "JSW Steel IPO: Major Steel Giant Plans Public Offering Worth ₹8,000 Crores" }
    });
    
    console.log(`Deleted ${result.deletedCount} mock articles`);
    
    // Show remaining articles
    const remaining = await News.find({}).select('title category author');
    console.log('Remaining articles:', remaining.length);
    remaining.forEach(article => {
      console.log(`- ${article.title} (${article.category})`);
    });
    
    const args = new Set(process.argv.slice(2));
    const shouldSeedSamples = args.has('--seed-samples');

    if (shouldSeedSamples) {
      let author = await User.findOne({});
      let seededCredentials = null;

      if (!author) {
        const password = crypto.randomBytes(9).toString('base64url');
        const user = new User({ username: 'seed_admin', password });
        author = await user.save();
        seededCredentials = { username: user.username, password };
      }

      const now = new Date();
      const stamp = now.toISOString().replace(/[:.]/g, '-');

      const largeBody = Array.from({ length: 2200 })
        .map(
          () =>
            'This is a sample article body used to validate chunked content storage and rendering.'
        )
        .join(' ');

      const sampleArticles = [
        {
          title: `Sample Technology Article ${stamp}`,
          category: 'Technology',
          description: 'Sample technology news for local testing.',
          content: largeBody,
          status: 'published',
          tags: ['seed-sample', 'technology'],
          excerpt: 'Sample technology news for local testing.',
          featured: true,
          trending: true,
          author: author._id,
        },
        {
          title: `Sample World Article ${stamp}`,
          category: 'World',
          description: 'Sample world news for local testing.',
          content:
            'This is a short sample world news article. It helps validate basic create/read flows in the UI.',
          status: 'published',
          tags: ['seed-sample', 'world'],
          excerpt: 'Sample world news for local testing.',
          featured: false,
          trending: false,
          author: author._id,
        },
        {
          title: `Sample Sports Draft ${stamp}`,
          category: 'Sports',
          description: 'Sample draft sports news for admin testing.',
          content:
            'This draft article validates admin-only listing of non-published content.',
          status: 'draft',
          tags: ['seed-sample', 'sports'],
          excerpt: 'Sample draft sports news for admin testing.',
          featured: false,
          trending: false,
          author: author._id,
        },
      ];

      const inserted = await News.insertMany(sampleArticles);
      console.log(`Seeded ${inserted.length} sample articles`);
      if (seededCredentials) {
        console.log('Seeded admin credentials:', seededCredentials);
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('Error clearing mock data:', error);
    process.exit(1);
  }
};

clearMockData();
