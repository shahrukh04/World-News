import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import { fetchNews, INews } from '../../services/api';
import NewsCard from '../../components/NewsCard/NewsCard';
import SimpleAd from '../../components/SimpleAd';
import { TrendingUp } from 'lucide-react';

const SportsNews = () => {
  const [newsList, setNewsList] = useState<INews[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      const data = await fetchNews();
      // Filter for sports news
      const sportsNews = data.filter((news: INews) => 
        news.category?.toLowerCase() === 'sports'
      );
      setNewsList(sportsNews);
      setLoading(false);
    };

    loadNews();
  }, []);

  const renderNewsWithAds = () => {
    if (loading) {
      return (
        <div className="space-y-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      );
    }
    
    if (newsList.length === 0) {
      return (
        <div className="text-center py-12">
          <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Sports News Available</h3>
          <p className="text-gray-500">Check back later for the latest sports updates.</p>
        </div>
      );
    }
    
    return newsList.map((news, index) => {
      const newsItem = <NewsCard key={news._id} news={news} />;
      
      if ((index + 1) % 3 === 0 && index < newsList.length - 1) {
        return (
          <React.Fragment key={`${news._id}-with-ad`}>
            {newsItem}
            <div className="my-6">
              <SimpleAd />
            </div>
          </React.Fragment>
        );
      }
      
      return newsItem;
    });
  };

  return (
    <div className="flex max-w-7xl mx-auto mt-6 gap-8 px-4">
      <Sidebar />
      <main className="flex-1">
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="h-8 w-8 text-red-600" />
          <h1 className="text-3xl font-bold text-gray-800">Sports News</h1>
        </div>
        
        <div className="mb-6">
          <SimpleAd />
        </div>
        
        {renderNewsWithAds()}
        
        <div className="mt-8">
          <SimpleAd style={{ textAlign: 'center' }} />
        </div>
      </main>
    </div>
  );
};

export default SportsNews;