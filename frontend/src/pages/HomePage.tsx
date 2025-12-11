import React, { useEffect, useState } from 'react';
import { Clock, AlertCircle, TrendingUp, Globe, ArrowRight } from 'lucide-react';
import AdSenseSlot from '../components/AdSenseSlot';
import { getImageUrl } from '../utils/imageUtils';
import { fetchNews, IPaginatedNews } from '../services/api';

// API Types
interface INews {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  content: string;
  image?: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  trending: boolean;
  views: number;
  shares: number;
  likes: number;
}

const Home = () => {
  const [newsList, setNewsList] = useState<INews[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getImageWithFallback = (image?: string) => {
    return getImageUrl(image) || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80';
  };

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        const result: IPaginatedNews = await fetchNews(undefined, 'published', 1, 24);
        setNewsList(result.news || []);
      } catch (err) {
        console.error('Error loading news:', err);
        setError('Failed to load news');
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  // Format date like BBC
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'World': 'bg-red-600',
      'Business': 'bg-blue-600',
      'Technology': 'bg-purple-600',
      'Sport': 'bg-yellow-600',
      'Health': 'bg-green-600',
      'Entertainment': 'bg-pink-600',
      'Politics': 'bg-indigo-600',
    };
    return colors[category] || 'bg-gray-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[1280px] mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600"></div>
            <p className="text-xl font-medium text-gray-700">Loading latest news...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || newsList.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[1280px] mx-auto px-4 py-20">
          <div className="text-center">
            <p className="text-xl text-gray-600">No news articles available</p>
          </div>
        </div>
      </div>
    );
  }

  const heroArticle = newsList[0];
  const featuredArticles = newsList.slice(1, 4);
  const secondaryArticles = newsList.slice(4, 8);
  const latestNews = newsList.slice(8);

  return (
    <div className="min-h-screen bg-white">
      {/* Breaking News Banner */}
      <div className="bg-red-600 text-white">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex items-center py-2 gap-3">
            <div className="flex items-center gap-2 flex-shrink-0">
              <AlertCircle className="h-5 w-5 animate-pulse" />
              <span className="font-bold text-sm uppercase tracking-wider">Breaking</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap">
                <span className="text-sm">
                  {newsList.slice(0, 3).map(news => news.title).join(' • ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Hero Section - BBC Style */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-b border-gray-200 py-6">
          {/* Main Hero Article - Takes 2 columns */}
          <div className="lg:col-span-2 lg:border-r border-gray-200 lg:pr-6">
            <article className="group cursor-pointer">
              <div className="relative overflow-hidden bg-black mb-4">
                <img
                  src={getImageUrl(heroArticle.image)}
                  alt={heroArticle.title}
                  className="w-full h-[400px] object-cover group-hover:opacity-90 transition-opacity"
                />
              </div>
              <div className="space-y-3">
                <span className={`inline-block px-2 py-1 text-white text-xs font-bold uppercase ${getCategoryColor(heroArticle.category)}`}>
                  {heroArticle.category}
                </span>
                <h1 className="text-4xl font-bold text-gray-900 leading-tight group-hover:text-red-600 transition-colors">
                  {heroArticle.title}
                </h1>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {heroArticle.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{formatDate(heroArticle.createdAt)}</span>
                  {heroArticle.views > 0 && (
                    <span className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      {heroArticle.views} views
                    </span>
                  )}
                </div>
              </div>
            </article>
          </div>

          {/* Side Featured Articles */}
          <div className="lg:pl-6 space-y-6 mt-6 lg:mt-0">
            {featuredArticles.map((news) => (
              <article key={news._id} className="group cursor-pointer pb-6 border-b border-gray-200 last:border-0">
                <div className="flex gap-4">
                  <div className="w-32 h-24 flex-shrink-0 overflow-hidden bg-gray-100">
                    <img
                      src={getImageUrl(news.image)}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-gray-600 uppercase">{news.category}</span>
                    <h3 className="text-base font-bold text-gray-900 mt-1 line-clamp-3 group-hover:text-red-600 transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-2">{formatDate(news.createdAt)}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Secondary Grid Section */}
        {/* AdSense - homepage fluid ad (placed between hero and secondary grid) */}
        <div className="py-6">
          <AdSenseSlot
            client="ca-pub-4811298709706693"
            slot="8792044648"
            adFormat="fluid"
            adLayoutKey="-gu-1e+1q-60+es"
            className="mx-auto max-w-screen-lg"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-8 border-b border-gray-200">
          {secondaryArticles.map((news) => (
            <article key={news._id} className="group cursor-pointer">
              <div className="relative overflow-hidden bg-gray-100 mb-3">
                <img
                  src={getImageUrl(news.image)}
                  alt={news.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="text-xs font-bold text-gray-600 uppercase">{news.category}</span>
              <h3 className="text-lg font-bold text-gray-900 mt-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                {news.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {news.description}
              </p>
              <p className="text-xs text-gray-500 mt-2">{formatDate(news.createdAt)}</p>
            </article>
          ))}
        </div>

        {/* Latest News - List View */}
        <div className="py-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="h-6 w-6 text-red-600" />
            <h2 className="text-3xl font-bold text-gray-900">Latest News</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((news) => (
              <article key={news._id} className="group cursor-pointer border-b border-gray-200 pb-6">
                <div className="flex gap-4">
                  <div className="w-28 h-20 flex-shrink-0 overflow-hidden bg-gray-100">
                    <img
                      src={getImageUrl(news.image)}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-gray-600 uppercase">{news.category}</span>
                    <h4 className="text-sm font-bold text-gray-900 mt-1 line-clamp-3 group-hover:text-red-600 transition-colors">
                      {news.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-2">{formatDate(news.createdAt)}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-8">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold hover:bg-red-700 transition-colors">
              <span>More News</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Marquee Animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
