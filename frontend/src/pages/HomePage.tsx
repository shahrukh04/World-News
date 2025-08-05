import React, { useEffect, useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import { fetchNews, INews } from '../services/api';
import NewsCard from '../components/NewsCard/NewsCard';
import AdSenseAd from '../AdSenseAd';
import { Clock, TrendingUp, Globe, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [newsList, setNewsList] = useState<INews[]>([]);
  const [featuredNews, setFeaturedNews] = useState<INews[]>([]);
  const [breakingNews, setBreakingNews] = useState<INews[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      const data = await fetchNews();
      setNewsList(data);
      
      // Set featured news (first 3 articles)
      setFeaturedNews(data.slice(0, 3));
      
      // Set breaking news (latest 5 articles)
      setBreakingNews(data.slice(0, 5));
      
      setLoading(false);
    };

    loadNews();
  }, []);

  // Function to insert ads between news items
  const renderNewsWithAds = () => {
    if (loading) return <p>Loading news...</p>;
    
    return newsList.map((news, index) => {
      // Insert an ad after every 3 news items
      const newsItem = <NewsCard key={news._id} news={news} />;
      
      if ((index + 1) % 3 === 0 && index < newsList.length - 1) {
        return (
          <React.Fragment key={`${news._id}-with-ad`}>
            {newsItem}
            <div className="my-6">
              <AdSenseAd adSlot={import.meta.env.VITE_ADSENSE_SLOT_RECTANGLE} adFormat="rectangle" />
            </div>
          </React.Fragment>
        );
      }
      
      return newsItem;
    });
  };

  return (
    <div className="flex max-w-7xl mx-auto mt-6 gap-8 px-4 lg:px-6">
      <Sidebar />
      <main className="flex-1 w-full lg:w-auto">
        {/* Breaking News Ticker */}
        <div className="bg-red-600 text-white p-3 rounded-lg mb-6 overflow-hidden">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
              <span className="font-bold text-xs sm:text-sm uppercase tracking-wide">Breaking</span>
            </div>
            <div className="animate-marquee whitespace-nowrap">
              <span className="text-xs sm:text-sm">
                Latest updates from around the world • Stay informed with AnSha Times • Breaking news as it happens
              </span>
            </div>
          </div>
        </div>

        {/* Featured Stories Section */}
        {!loading && featuredNews.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Featured Stories</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
              {featuredNews.map((news) => (
                <div key={news._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <NewsCard news={news} />
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Top ad placement */}
        <div className="mb-6">
          <AdSenseAd adSlot={import.meta.env.VITE_ADSENSE_SLOT_HORIZONTAL} adFormat="horizontal" />
        </div>

        {/* Latest News Section */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Latest News</h2>
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              Updated {new Date().toLocaleTimeString()}
            </div>
          </div>
          
          {renderNewsWithAds()}
        </section>
        
        {/* Bottom ad placement */}
        <div className="mt-8">
          <AdSenseAd adSlot={import.meta.env.VITE_ADSENSE_SLOT_SIDEBAR} adFormat="horizontal" />
        </div>
      </main>
    </div>
  );
};

export default Home;
