import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Sidebar from '../components/common/Sidebar';
import { fetchNews, INews } from '../services/api';
import NewsCard from '../components/NewsCard/NewsCard';
import SimpleAd from '../components/SimpleAd';
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
      try {
        const result = await fetchNews(undefined, 'published', 1, 50);
        const data = result.news;
        setNewsList(data);
        
        // Set featured news (first 3 articles)
        setFeaturedNews(data.slice(0, 3));
        
        // Set breaking news (latest 5 articles)
        setBreakingNews(data.slice(0, 5));
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  // Structured data for homepage
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "World News",
    "alternateName": "WorldNew.in",
    "url": "https://worldnew.in",
    "description": "Your trusted source for breaking news, world updates, India news, health, sports, technology, and jobs. Stay informed with accurate and timely news coverage.",
    "publisher": {
      "@type": "Organization",
      "name": "World News",
      "url": "https://worldnew.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://worldnew.in/logo.png"
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://worldnew.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": "World News",
    "url": "https://worldnew.in",
    "logo": {
      "@type": "ImageObject",
      "url": "https://worldnew.in/logo.png"
    },
    "sameAs": [
      "https://www.facebook.com/worldnew.in",
      "https://twitter.com/worldnew_in",
      "https://www.linkedin.com/company/worldnew"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://worldnew.in/contact"
    }
  };

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
              <SimpleAd />
            </div>
          </React.Fragment>
        );
      }
      
      return newsItem;
    });
  };

  return (
    <>
      <Helmet>
        <title>World News - Breaking News & Current Affairs | Latest Updates</title>
        <meta name="description" content="Stay updated with World News - your trusted source for breaking news, world updates, India news, health, sports, technology, and jobs. Get accurate and timely news coverage 24/7." />
        <meta name="keywords" content="world news, breaking news, India news, international news, sports news, technology news, health news, job news, IPO news, current affairs" />
        <link rel="canonical" href="https://worldnew.in/" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="World News - Breaking News & Current Affairs" />
        <meta property="og:description" content="Stay updated with World News - your trusted source for breaking news, world updates, India news, health, sports, technology, and jobs." />
        <meta property="og:url" content="https://worldnew.in/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://worldnew.in/og-image.jpg" />
        <meta property="og:site_name" content="World News" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="World News - Breaking News & Current Affairs" />
        <meta name="twitter:description" content="Stay updated with World News - your trusted source for breaking news, world updates, India news, health, sports, technology, and jobs." />
        <meta name="twitter:image" content="https://worldnew.in/twitter-image.jpg" />
        
        {/* Additional SEO Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="author" content="World News Team" />
        <meta name="publisher" content="World News" />
        <meta name="language" content="en" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.country" content="India" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(websiteStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationStructuredData)}
        </script>
      </Helmet>
      
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
                  Latest updates from around the world • Stay informed with World News • Breaking news as it happens
                </span>
              </div>
            </div>
          </div>

          {/* Featured Stories Section */}
          {!loading && featuredNews.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Featured Stories</h1>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
                {featuredNews.map((news) => (
                  <article key={news._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <NewsCard news={news} />
                  </article>
                ))}
              </div>
            </section>
          )}
          
          {/* Top ad placement */}
          <div className="mb-6">
            <SimpleAd />
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
            
            <div className="space-y-6">
              {renderNewsWithAds()}
            </div>
          </section>
          
          {/* Bottom ad placement */}
          <div className="mt-8">
            <SimpleAd />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
