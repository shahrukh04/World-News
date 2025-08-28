import cron from 'node-cron';
import { fetchTrendingNews } from './newsFetcher.js';
import News from '../models/newsModel.js';
import User from '../models/userModel.js';

class NewsScheduler {
  constructor() {
    this.isRunning = false;
    this.categories = ['India', 'World', 'Health', 'Jobs', 'Sports', 'Technology', 'IPO', 'Other'];
  }

  // Schedule daily news fetching at 6:00 AM
  start() {
    if (this.isRunning) {
      console.log('News scheduler is already running');
      return;
    }

    // Run every day at 9:30 PM
    cron.schedule('30 21 * * *', async () => {
      console.log('Starting daily news fetch...');
      await this.fetchAndCreateDailyNews();
    });

    // Also run immediately for testing (remove in production)
    // this.fetchAndCreateDailyNews();

    this.isRunning = true;
    console.log('News scheduler started - will run daily at 9:30 PM');
  }

  async fetchAndCreateDailyNews() {
    try {
      // Get the first admin user as the author
      const adminUser = await User.findOne().select('_id');
      if (!adminUser) {
        console.error('No admin user found for automated news posting');
        return;
      }

      console.log('Fetching trending news for all categories...');
      
      for (const category of this.categories) {
        try {
          console.log(`Fetching news for category: ${category}`);
          const articles = await fetchTrendingNews(category, 10);
          
          for (const article of articles) {
            // Check if article already exists (by title)
            const existingNews = await News.findOne({ title: article.title });
            if (existingNews) {
              console.log(`Article already exists: ${article.title}`);
              continue;
            }

            // Create new news article
            const newsData = {
              title: article.title,
              category: category,
              description: article.description || article.content,
              content: article.content || article.description || 'Content not available',
              image: article.image,
              author: adminUser._id,
              status: 'published',
            };

            const news = new News(newsData);
            await news.save();
            console.log(`Created news article: ${article.title}`);
          }
        } catch (error) {
          console.error(`Error fetching news for category ${category}:`, error.message);
        }
      }

      console.log('Daily news fetch completed');
    } catch (error) {
      console.error('Error in daily news fetch:', error);
    }
  }

  stop() {
    this.isRunning = false;
    console.log('News scheduler stopped');
  }

  // Manual trigger for testing
  async triggerManualFetch() {
    console.log('Manual news fetch triggered');
    await this.fetchAndCreateDailyNews();
  }
}

export default new NewsScheduler();