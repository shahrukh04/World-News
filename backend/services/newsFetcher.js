import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

class NewsFetcher {
  constructor() {
    // You can use multiple news APIs for better coverage
    this.newsApiKey = process.env.NEWS_API_KEY; // Get from newsapi.org
    this.gnewsApiKey = process.env.GNEWS_API_KEY; // Get from gnews.io
    this.baseUrls = {
      newsapi: 'https://newsapi.org/v2',
      gnews: 'https://gnews.io/api/v4'
    };
  }

  // Map our categories to news API categories/keywords
  getCategoryKeywords(category) {
    const categoryMap = {
      'India': { country: 'in', keywords: 'India OR Indian OR Delhi OR Mumbai' },
      'World': { category: 'general', keywords: 'international OR global OR world' },
      'Health': { category: 'health', keywords: 'health OR medical OR healthcare OR medicine' },
      'Jobs': { keywords: 'jobs OR employment OR career OR hiring OR recruitment' },
      'Sports': { category: 'sports', keywords: 'sports OR football OR cricket OR basketball OR tennis OR olympics' },
      'Technology': { category: 'technology', keywords: 'technology OR tech OR AI OR software OR innovation OR startup' },
      'IPO': { keywords: 'IPO OR "initial public offering" OR stock market OR shares OR listing' },
      'Business': { category: 'business', keywords: 'business OR economy OR finance OR market OR corporate' },
      'Entertainment': { category: 'entertainment', keywords: 'entertainment OR movies OR music OR celebrity OR hollywood' },
      'Other': { category: 'general', keywords: 'news OR current events OR trending' }
    };
    return categoryMap[category] || { keywords: category };
  }

  // Fetch from NewsAPI.org
  async fetchFromNewsAPI(category, limit = 10) {
    if (!this.newsApiKey) {
      console.warn('NEWS_API_KEY not configured');
      return [];
    }

    try {
      const categoryConfig = this.getCategoryKeywords(category);
      let url = `${this.baseUrls.newsapi}/top-headlines`;
      
      const params = {
        apiKey: this.newsApiKey,
        pageSize: limit,
        language: 'en'
      };

      if (categoryConfig.country) {
        params.country = categoryConfig.country;
      }
      if (categoryConfig.category) {
        params.category = categoryConfig.category;
      }
      if (categoryConfig.keywords) {
        params.q = categoryConfig.keywords;
      }

      const response = await axios.get(url, { params });
      
      return response.data.articles.map(article => ({
        title: article.title,
        description: article.description,
        content: article.content,
        image: article.urlToImage,
        source: article.source.name,
        publishedAt: article.publishedAt,
        url: article.url
      }));
    } catch (error) {
      console.error('Error fetching from NewsAPI:', error.message);
      return [];
    }
  }

  // Fetch from GNews.io
  async fetchFromGNews(category, limit = 10) {
    if (!this.gnewsApiKey) {
      console.warn('GNEWS_API_KEY not configured');
      return [];
    }

    try {
      const categoryConfig = this.getCategoryKeywords(category);
      let url = `${this.baseUrls.gnews}/top-headlines`;
      
      const params = {
        token: this.gnewsApiKey,
        max: limit,
        lang: 'en'
      };

      if (categoryConfig.country) {
        params.country = categoryConfig.country;
      }
      if (categoryConfig.category) {
        params.category = categoryConfig.category;
      }
      if (categoryConfig.keywords) {
        params.q = categoryConfig.keywords;
      }

      const response = await axios.get(url, { params });
      
      return response.data.articles.map(article => ({
        title: article.title,
        description: article.description,
        content: article.content,
        image: article.image,
        source: article.source.name,
        publishedAt: article.publishedAt,
        url: article.url
      }));
    } catch (error) {
      console.error('Error fetching from GNews:', error.message);
      return [];
    }
  }

  // Fallback mock data for testing when APIs are not configured
  generateMockNews(category, limit = 10) {
    const mockTitles = {
      'India': [
        'Breaking: Major Economic Policy Changes Announced',
        'Technology Sector Shows Strong Growth in Q4',
        'Infrastructure Development Projects Launched',
        'Education Reform Initiative Gains Momentum',
        'Healthcare Accessibility Improvements Announced'
      ],
      'World': [
        'Global Climate Summit Reaches Key Agreements',
        'International Trade Relations Show Positive Trends',
        'Breakthrough in Renewable Energy Technology',
        'Global Health Initiative Launches New Program',
        'Space Exploration Mission Achieves Milestone'
      ],
      'Health': [
        'New Medical Research Shows Promising Results',
        'Mental Health Awareness Campaign Launches',
        'Breakthrough Treatment for Chronic Conditions',
        'Public Health Initiative Reduces Disease Rates',
        'Medical Technology Advances Patient Care'
      ],
      'Jobs': [
        'Tech Industry Creates Thousands of New Positions',
        'Remote Work Trends Continue to Evolve',
        'Skills Development Programs Launch Nationwide',
        'Employment Rates Show Steady Improvement',
        'New Career Opportunities in Green Energy Sector'
      ],
      'Sports': [
        'Championship Finals Draw Record Viewership',
        'Olympic Preparations Underway for Next Games',
        'Major League Season Kicks Off with Excitement',
        'Rising Star Athletes Break Multiple Records',
        'Sports Technology Revolutionizes Training Methods'
      ],
      'Technology': [
        'Artificial Intelligence Breakthrough Announced',
        'New Smartphone Technology Changes User Experience',
        'Cybersecurity Advances Protect Digital Infrastructure',
        'Quantum Computing Reaches New Milestone',
        'Tech Giants Invest Billions in Green Technology'
      ],
      'IPO': [
        'Major Tech Company Files for Public Offering',
        'Healthcare Startup Announces IPO Plans',
        'Green Energy Firm Goes Public with Strong Debut',
        'Fintech Company Raises Billions in Market Debut',
        'E-commerce Platform Launches Successful IPO'
      ],
      'Business': [
        'Global Markets Show Strong Recovery Trends',
        'Corporate Earnings Exceed Analyst Expectations',
        'Merger and Acquisition Activity Increases',
        'Supply Chain Innovations Boost Efficiency',
        'Sustainable Business Practices Gain Momentum'
      ],
      'Entertainment': [
        'Blockbuster Movie Breaks Box Office Records',
        'Streaming Platform Announces Original Content',
        'Music Industry Embraces New Distribution Models',
        'Celebrity Charity Event Raises Millions',
        'Gaming Industry Reaches New Revenue Heights'
      ],
      'Other': [
        'Scientific Discovery Opens New Possibilities',
        'Digital Transformation Accelerates Across Industries',
        'Innovation in Transportation Sector',
        'Environmental Conservation Efforts Show Results',
        'Educational Technology Improves Learning Outcomes'
      ]
    };

    const titles = mockTitles[category] || mockTitles['Other'];
    const articles = [];

    for (let i = 0; i < Math.min(limit, titles.length); i++) {
      articles.push({
        title: titles[i],
        description: `This is a trending news article about ${titles[i].toLowerCase()}. The article provides comprehensive coverage of recent developments and their impact on the industry and society.`,
        content: `Detailed content for ${titles[i]}. This article covers the latest developments, expert opinions, and analysis of the current situation. The information is sourced from reliable sources and provides valuable insights for readers interested in staying updated with current events.`,
        image: `https://picsum.photos/800/400?random=${Date.now() + i}`,
        source: 'News Source',
        publishedAt: new Date().toISOString(),
        url: '#'
      });
    }

    return articles;
  }

  // Main function to fetch trending news
  async fetchTrendingNews(category, limit = 10) {
    console.log(`Fetching ${limit} trending news articles for category: ${category}`);
    
    let articles = [];

    // Try NewsAPI first
    if (articles.length < limit) {
      const newsApiArticles = await this.fetchFromNewsAPI(category, limit - articles.length);
      articles = articles.concat(newsApiArticles);
    }

    // Try GNews if we need more articles
    if (articles.length < limit) {
      const gnewsArticles = await this.fetchFromGNews(category, limit - articles.length);
      articles = articles.concat(gnewsArticles);
    }

    // Use mock data if no real articles were fetched
    if (articles.length === 0) {
      console.log(`No articles from APIs, using mock data for category: ${category}`);
      articles = this.generateMockNews(category, limit);
    }

    // Ensure we don't exceed the limit
    return articles.slice(0, limit);
  }
}

// Export the fetchTrendingNews function
const newsFetcher = new NewsFetcher();
export const fetchTrendingNews = (category, limit) => newsFetcher.fetchTrendingNews(category, limit);
export default newsFetcher;