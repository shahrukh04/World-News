import React, { useEffect, useState } from 'react';
import { AlertCircle, Globe } from 'lucide-react';
import { getImageUrlWithFallback } from '@/utils/imageUtils';

// API Types
interface INews {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  content?: string;
  contentChunks?: string[];
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

  const fallbackCard = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80';

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/news?status=published&limit=3');
        const data = await response.json();
        setNewsList(data?.news || []);
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
        {/* Breaking News Skeleton */}
        <div className="bg-red-600 text-white h-10 flex items-center px-4">
           <div className="max-w-[1280px] mx-auto w-full flex items-center gap-3">
             <div className="h-5 w-20 bg-red-700 animate-pulse rounded"></div>
             <div className="h-5 flex-1 bg-red-500 animate-pulse rounded opacity-50"></div>
           </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-b border-gray-200 py-6">
            {/* Hero Article Skeleton */}
            <div className="lg:col-span-2 lg:border-r border-gray-200 lg:pr-6">
              <div className="w-full h-[400px] bg-gray-200 animate-pulse mb-4 rounded-sm"></div>
              <div className="space-y-4">
                <div className="h-6 w-24 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-10 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 w-4/6 bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>

            {/* Featured Articles Skeleton */}
            <div className="lg:pl-6 space-y-6 mt-6 lg:mt-0">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 pb-6 border-b border-gray-200 last:border-0">
                  <div className="w-32 h-24 flex-shrink-0 bg-gray-200 animate-pulse rounded-sm"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-3 w-16 bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </div>
              ))}
            </div>
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
  const featuredArticles = newsList.slice(1);

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
            <a href={`/news/${heroArticle.slug || heroArticle._id}`} className="block group">
              <div className="relative overflow-hidden bg-black mb-4">
                <img
                  src={getImageUrlWithFallback(heroArticle.image, fallbackCard)}
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
            </a>
          </div>

          {/* Side Featured Articles */}
          <div className="lg:pl-6 space-y-6 mt-6 lg:mt-0">
            {featuredArticles.map((news) => (
              <a
                key={news._id}
                href={`/news/${news.slug || news._id}`}
                className="block group pb-6 border-b border-gray-200 last:border-0"
              >
                <div className="flex gap-4">
                  <div className="w-32 h-24 flex-shrink-0 overflow-hidden bg-gray-100">
                    <img
                      src={getImageUrlWithFallback(news.image, fallbackCard)}
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
              </a>
            ))}
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
