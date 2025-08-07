import React, { useEffect, useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import { fetchNews, INews } from '../services/api';
import NewsCard from '../components/NewsCard/NewsCard';
import SimpleAd from '../components/SimpleAd';
import { Globe, MapPin, Heart, Briefcase, TrendingUp, Zap, Clock } from 'lucide-react';

interface Props {
  category: string;
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'world': return Globe;
    case 'india': return MapPin;
    case 'health': return Heart;
    case 'jobs': return Briefcase;
    case 'sports': return TrendingUp;
    case 'technology': return Zap;
    default: return Clock;
  }
};

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'world': return 'text-blue-600';
    case 'india': return 'text-orange-600';
    case 'health': return 'text-red-600';
    case 'jobs': return 'text-indigo-600';
    case 'sports': return 'text-green-600';
    case 'technology': return 'text-purple-600';
    default: return 'text-gray-600';
  }
};

const CategoryPageTemplate: React.FC<Props> = ({ category }) => {
  const [newsList, setNewsList] = useState<INews[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      const data = await fetchNews();
      // Filter for specific category
      const categoryNews = data.filter((news: INews) => 
        news.category?.toLowerCase() === category.toLowerCase()
      );
      setNewsList(categoryNews);
      setLoading(false);
    };

    loadNews();
  }, [category]);

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
      const Icon = getCategoryIcon(category);
      return (
        <div className="text-center py-12">
          <Icon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No {category} News Available</h3>
          <p className="text-gray-500">Check back later for the latest {category.toLowerCase()} updates.</p>
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

  const Icon = getCategoryIcon(category);
  const colorClass = getCategoryColor(category);

  return (
    <div className="flex max-w-7xl mx-auto mt-6 gap-8 px-4 lg:px-6">
      <Sidebar />
      <main className="flex-1 w-full lg:w-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
          <div className="flex items-center space-x-3">
            <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${colorClass}`} />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{category} News</h1>
          </div>
          <div className="text-xs sm:text-sm text-gray-500">
            Updated {new Date().toLocaleTimeString()}
          </div>
        </div>
        
        <div className="mb-6">
          <SimpleAd />
        </div>
        
        {renderNewsWithAds()}
        
        <div className="mt-8">
          <SimpleAd />
        </div>
      </main>
     </div>
   );
};

export default CategoryPageTemplate;
