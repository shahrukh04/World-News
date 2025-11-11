import React, { useEffect, useState } from 'react';
import { Clock, TrendingUp, Filter, Grid, List, ChevronRight } from 'lucide-react';

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

interface CategoryPageTemplateProps {
  category: string;
}

const CategoryPageTemplate: React.FC<CategoryPageTemplateProps> = ({ category }) => {
  const [newsList, setNewsList] = useState<INews[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');

  // Get image URL helper
  const getImageUrl = (image?: string) => {
    if (!image) return 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80';
    if (image.startsWith('http')) return image;
    return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${image}`;
  };

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/news?category=${category}&status=published&limit=50`);
        const data = await response.json();
        let articles = data?.news || [];

        // Sort articles
        if (sortBy === 'popular') {
          articles = articles.sort((a: INews, b: INews) => b.views - a.views);
        } else {
          articles = articles.sort((a: INews, b: INews) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }

        setNewsList(articles);
      } catch (err) {
        console.error('Error loading news:', err);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [category, sortBy]);

  // Format date like BBC
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Get category color
  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      'World': 'bg-red-600',
      'Business': 'bg-blue-600',
      'Technology': 'bg-purple-600',
      'Sport': 'bg-yellow-600',
      'Health': 'bg-green-600',
      'Entertainment': 'bg-pink-600',
      'Politics': 'bg-indigo-600',
    };
    return colors[cat] || 'bg-gray-600';
  };

  // Get category description
  const getCategoryDescription = (cat: string) => {
    const descriptions: Record<string, string> = {
      'World': 'International news, global affairs, and breaking stories from around the world',
      'Business': 'Financial markets, economy, companies, and business news',
      'Technology': 'Tech news, gadgets, innovation, and digital trends',
      'Sport': 'Sports news, scores, fixtures, and analysis',
      'Health': 'Health news, medical breakthroughs, and wellness advice',
      'Entertainment': 'Celebrity news, movies, music, and entertainment updates',
      'Politics': 'Political news, government policies, and election coverage',
    };
    return descriptions[cat] || `Latest ${cat} news and updates`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[1280px] mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600"></div>
            <p className="text-xl font-medium text-gray-700">Loading {category} news...</p>
          </div>
        </div>
      </div>
    );
  }

  if (newsList.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[1280px] mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{category}</h1>
            <p className="text-xl text-gray-600">No articles available in this category</p>
          </div>
        </div>
      </div>
    );
  }

  const featuredArticle = newsList[0];
  const topArticles = newsList.slice(1, 4);
  const remainingArticles = newsList.slice(4);

  return (
    <div className="min-h-screen bg-white">
      {/* Category Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-[1280px] mx-auto px-4 py-8">
          <nav className="flex items-center gap-2 text-sm mb-4 text-gray-300">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white font-medium">{category}</span>
          </nav>
          <h1 className="text-5xl font-bold mb-3">{category}</h1>
          <p className="text-xl text-gray-300">{getCategoryDescription(category)}</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">
                {newsList.length} articles
              </span>
              <div className="h-4 w-px bg-gray-300"></div>
              <button
                onClick={() => setSortBy('latest')}
                className={`text-sm font-medium px-3 py-1 rounded transition-colors ${
                  sortBy === 'latest'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Clock className="h-4 w-4 inline mr-1" />
                Latest
              </button>
              <button
                onClick={() => setSortBy('popular')}
                className={`text-sm font-medium px-3 py-1 rounded transition-colors ${
                  sortBy === 'popular'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <TrendingUp className="h-4 w-4 inline mr-1" />
                Popular
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                aria-label="Grid view"
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list'
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                aria-label="List view"
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1280px] mx-auto px-4 py-8">
        {/* Featured Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 pb-8 border-b border-gray-200">
          {/* Main Featured Article */}
          <div className="lg:col-span-2">
            <article className="group cursor-pointer">
              <div className="relative overflow-hidden bg-black mb-4">
                <img
                  src={getImageUrl(featuredArticle.image)}
                  alt={featuredArticle.title}
                  className="w-full h-[450px] object-cover group-hover:opacity-90 transition-opacity"
                />
                {featuredArticle.featured && (
                  <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase">
                    Featured
                  </span>
                )}
              </div>
              <div className="space-y-3">
                <h2 className="text-4xl font-bold text-gray-900 leading-tight group-hover:text-red-600 transition-colors">
                  {featuredArticle.title}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {featuredArticle.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="font-medium">{formatDate(featuredArticle.createdAt)}</span>
                  {featuredArticle.views > 0 && (
                    <span>{featuredArticle.views.toLocaleString()} views</span>
                  )}
                </div>
              </div>
            </article>
          </div>

          {/* Top 3 Articles Sidebar */}
          <div className="space-y-6">
            {topArticles.map((news) => (
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
                    <h3 className="text-base font-bold text-gray-900 line-clamp-3 group-hover:text-red-600 transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-2">{formatDate(news.createdAt)}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Remaining Articles - Grid or List View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingArticles.map((news) => (
              <article key={news._id} className="group cursor-pointer">
                <div className="relative overflow-hidden bg-gray-100 mb-3">
                  <img
                    src={getImageUrl(news.image)}
                    alt={news.title}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform"
                  />
                  {news.trending && (
                    <span className="absolute top-3 right-3 bg-yellow-500 text-gray-900 px-2 py-1 text-xs font-bold uppercase flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Trending
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {news.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{formatDate(news.createdAt)}</span>
                    {news.views > 0 && (
                      <>
                        <span>•</span>
                        <span>{news.views.toLocaleString()} views</span>
                      </>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {remainingArticles.map((news) => (
              <article key={news._id} className="group cursor-pointer flex gap-6 pb-6 border-b border-gray-200">
                <div className="w-72 h-48 flex-shrink-0 overflow-hidden bg-gray-100">
                  <img
                    src={getImageUrl(news.image)}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1 min-w-0 space-y-3">
                  <h3 className="text-2xl font-bold text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-base text-gray-700 line-clamp-3">
                    {news.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="font-medium">{formatDate(news.createdAt)}</span>
                    {news.views > 0 && (
                      <>
                        <span>•</span>
                        <span>{news.views.toLocaleString()} views</span>
                      </>
                    )}
                    {news.trending && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-yellow-600 font-medium">
                          <TrendingUp className="h-4 w-4" />
                          Trending
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {remainingArticles.length > 0 && (
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 text-white font-bold hover:bg-red-700 transition-colors rounded">
              <span>Load More Articles</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPageTemplate;