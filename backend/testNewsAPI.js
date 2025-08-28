import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
const NODE_ENV = process.env.NODE_ENV || 'development';
if (NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config({ path: '.env.local' });
}
dotenv.config();

const testNewsAPI = async () => {
  const newsApiKey = process.env.NEWS_API_KEY;
  console.log('NEWS_API_KEY:', newsApiKey ? 'Configured' : 'Not configured');
  
  if (!newsApiKey) {
    console.error('NEWS_API_KEY not found in environment variables');
    return;
  }

  try {
    // Test with a simple query
    const url = 'https://newsapi.org/v2/top-headlines';
    const params = {
      apiKey: newsApiKey,
      country: 'us',
      pageSize: 5,
      language: 'en'
    };

    console.log('Testing NewsAPI with URL:', url);
    console.log('Parameters:', { ...params, apiKey: '[HIDDEN]' });

    const response = await axios.get(url, { params });
    
    console.log('API Response Status:', response.status);
    console.log('Total Results:', response.data.totalResults);
    console.log('Articles Count:', response.data.articles?.length || 0);
    
    if (response.data.articles && response.data.articles.length > 0) {
      console.log('\nFirst article:');
      const article = response.data.articles[0];
      console.log('Title:', article.title);
      console.log('Source:', article.source?.name);
      console.log('Published:', article.publishedAt);
      console.log('Description:', article.description?.substring(0, 100) + '...');
    }
    
  } catch (error) {
    console.error('Error testing NewsAPI:');
    console.error('Status:', error.response?.status);
    console.error('Message:', error.response?.data?.message || error.message);
    console.error('Code:', error.response?.data?.code);
  }
};

testNewsAPI();