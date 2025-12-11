import React, { useEffect, useState } from 'react';
import { fetchNews, INews, IPaginatedNews } from '../../services/api';
import { Zap, AlertCircle, Clock, Globe, ArrowRight } from 'lucide-react';
import { getImageUrl } from '../../utils/imageUtils';

const TechnologyNews = () => {
  const [newsList, setNewsList] = useState<INews[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<IPaginatedNews['pagination'] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const loadNews = async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchNews('Technology', 'published', page, 12);
      setNewsList(result.news);
      setPagination(result.pagination);
      setCurrentPage(page);
    } catch (err) {
      console.error('Error loading Technology news:', err);
      setError('Failed to load technology news');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const handlePageChange = (page: number) => {
    loadNews(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const getImageWithFallback = (image?: string) => {
    return getImageUrl(image) || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[1280px] mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
            <p className="text-xl font-medium text-gray-700">Loading technology news...</p>
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
            <Zap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No technology news available</p>
            <p className="text-gray-500 mt-2">Please check back later.</p>
          </div>
        </div>
      </div>
    );
  }

  const heroArticle = newsList[0];
  const featuredArticles = newsList.slice(1, 4);
  const gridArticles = newsList.slice(4, 10);
  const listArticles = newsList.slice(10);

  return (
    <div className="min-h-screen bg-white">
      {/* Breaking Tech Banner */}
      {newsList.length > 0 && (
        <div className="bg-purple-600 text-white">
          <div className="max-w-[1280px] mx-auto px-4">
            <div className="flex items-center py-2 gap-3">
              <div className="flex items-center gap-2 flex-shrink-0">
                <AlertCircle className="h-5 w-5 animate-pulse" />
                <span className="font-bold text-sm uppercase tracking-wider">Breaking</span>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="animate-marquee whitespace-nowrap">
                  <span className="text-sm">
                    {newsList.slice(0, 3).map(n => n.title).join(' • ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-[1280px] mx-auto px-4 py-6">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">Technology</h1>
          </div>
          <p className="text-base text-gray-600">
            Latest tech news, gadget reviews, AI breakthroughs and digital trends from around the world.
          </p>
        </header>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-b border-gray-200 pb-8 mb-8">
          {/* Main Hero */}
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
                <span className="inline-block px-2 py-1 bg-purple-600 text-white text-xs font-bold uppercase">
                  Technology
                </span>
                <h1 className="text-4xl font-bold text-gray-900 leading-tight group-hover:text-purple-600 transition-colors">
                  {heroArticle.title}
                </h1>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {heroArticle.description || heroArticle.content.substring(0, 180) + '...'}
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

          {/* Side Featured */}
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
                    <h3 className="text-base font-bold text-gray-900 line-clamp-3 group-hover:text-purple-600 transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-2">{formatDate(news.createdAt)}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8 border-b border-gray-200">
          {gridArticles.map((news) => (
            <article key={news._id} className="group cursor-pointer">
              <div className="relative overflow-hidden bg-gray-100 mb-3">
                <img
                  src={getImageUrl(news.image)}
                  alt={news.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mt-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                {news.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {news.description || news.content.substring(0, 100) + '...'}
              </p>
              <p className="text-xs text-gray-500 mt-2">{formatDate(news.createdAt)}</p>
            </article>
          ))}
        </div>

        {/* List Section */}
        <div className="py-8">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Latest Updates</h2>
          </div>

          <div className="space-y-6">
            {listArticles.map((news, index) => (
              <div key={news._id}>
                <article className="group cursor-pointer flex gap-4 pb-6 border-b border-gray-200 last:border-0">
                  <div className="w-28 h-20 flex-shrink-0 overflow-hidden bg-gray-100">
                    <img
                      src={getImageUrl(news.image)}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {news.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">{formatDate(news.createdAt)}</p>
                  </div>
                </article>

                {/* Ad every 3 items */}
                {index === 2 && (
                  <div className="my-8 py-6 border-t border-b border-gray-200 bg-gray-50">
                    <div className="text-center">
                      <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-2">
                        Advertisement
                      </p>
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-32 flex items-center justify-center text-gray-500">
                        ADVERTISEMENT
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center gap-2 text-sm">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {currentPage} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                  className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>

        {/* Bottom Ad */}
        <div className="mt-12 py-6 border-t border-gray-200">
          <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-2 text-center">
            Advertisement
          </p>
          <div className="bg-gray-100 border border-gray-300 rounded p-8 text-center text-gray-500">
            ADVERTISEMENT
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-xs text-gray-500 text-center py-6 border-t">
          <p>© 2025 BBC News Clone. All rights reserved.</p>
        </footer>
      </div>

      {/* Marquee Animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TechnologyNews;
