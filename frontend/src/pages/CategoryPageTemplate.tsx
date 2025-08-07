import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
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

const getCategoryDescription = (category: string) => {
  switch (category.toLowerCase()) {
    case 'world': return 'Latest world news, international affairs, and global updates from around the globe';
    case 'india': return 'Breaking news from India, politics, economy, and current affairs from across the nation';
    case 'health': return 'Health news, medical breakthroughs, wellness tips, and healthcare updates';
    case 'jobs': return 'Latest job opportunities, career news, employment trends, and professional development';
    case 'sports': return 'Sports news, live scores, match updates, and athletic achievements from around the world';
    case 'technology': return 'Technology news, gadget reviews, tech innovations, and digital transformation updates';
    default: return `Latest ${category.toLowerCase()} news and updates`;
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

  const categoryTitle = `${category.charAt(0).toUpperCase() + category.slice(1)} News`;
  const categoryDescription = getCategoryDescription(category);
  const canonicalUrl = `https://worldnew.in/${category.toLowerCase()}`;
  
  // Generate structured data for the category page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": categoryTitle,
    "description": categoryDescription,
    "url": canonicalUrl,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": newsList.length,
      "itemListElement": newsList.slice(0, 10).map((news, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "NewsArticle",
          "headline": news.title,
          "description": news.description,
          "url": `https://worldnew.in/news/${news._id}`,
          "datePublished": news.createdAt,
          "author": {
            "@type": "Person",
            "name": news.author || "World News Team"
          }
        }
      }))
    },
    "publisher": {
      "@type": "Organization",
      "name": "World News",
      "url": "https://worldnew.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://worldnew.in/logo.png"
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://worldnew.in"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": categoryTitle,
          "item": canonicalUrl
        }
      ]
    }
  };

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
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{categoryTitle} - Latest Updates | World News</title>
        <meta name="title" content={`${categoryTitle} - Latest Updates | World News`} />
        <meta name="description" content={categoryDescription} />
        <meta name="keywords" content={`${category.toLowerCase()} news, latest ${category.toLowerCase()}, ${category.toLowerCase()} updates, breaking ${category.toLowerCase()} news, world news ${category.toLowerCase()}`} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={`${categoryTitle} - Latest Updates | World News`} />
        <meta property="og:description" content={categoryDescription} />
        <meta property="og:image" content="https://worldnew.in/og-image.jpg" />
        <meta property="og:site_name" content="World News" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={`${categoryTitle} - Latest Updates | World News`} />
        <meta property="twitter:description" content={categoryDescription} />
        <meta property="twitter:image" content="https://worldnew.in/og-image.jpg" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="author" content="World News" />
        <meta name="publisher" content="World News" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 day" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="flex max-w-7xl mx-auto mt-6 gap-8 px-4 lg:px-6">
        <Sidebar />
        <main className="flex-1 w-full lg:w-auto">
          {/* Breadcrumb Navigation */}
          <nav className="mb-4 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-gray-500">
              <li>
                <a href="/" className="hover:text-blue-600 transition-colors">
                  Home
                </a>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <span className="text-gray-700 font-medium">{categoryTitle}</span>
              </li>
            </ol>
          </nav>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
            <div className="flex items-center space-x-3">
              <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${colorClass}`} />
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{categoryTitle}</h1>
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              Updated {new Date().toLocaleTimeString()}
            </div>
          </div>
          
          {/* Category Description */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-gray-700 leading-relaxed">{categoryDescription}</p>
            {newsList.length > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                Showing {newsList.length} latest {category.toLowerCase()} articles
              </p>
            )}
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
    </>
  );
};

export default CategoryPageTemplate;
