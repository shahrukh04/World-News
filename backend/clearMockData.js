import mongoose from 'mongoose';
import dotenv from 'dotenv';
import News from './models/newsModel.js';

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
    
    process.exit(0);
  } catch (error) {
    console.error('Error clearing mock data:', error);
    process.exit(1);
  }
};

clearMockData();