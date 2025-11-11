import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Share2, Facebook, Twitter, Linkedin, Mail, Bookmark, Eye, ThumbsUp, MessageCircle, ChevronRight, TrendingUp } from 'lucide-react';

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
  tags?: string[];
  readingTime?: number;
}

const NewsDetailPage: React.FC = () => {
  const params = useParams();
  // Accept either :id or :slug route param
  const newsId = (params as any).id || (params as any).slug || '';
  const [news, setNews] = useState<INews | null>(null);
  const [relatedNews, setRelatedNews] = useState<INews[]>([]);
  const [loading, setLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Get image URL helper
  const getImageUrl = (image?: string) => {
    if (!image) return 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80';
    if (image.startsWith('http')) return image;
    return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${image}`;
  };

  useEffect(() => {
    const loadNewsDetail = async () => {
      setLoading(true);
      try {
        // Fetch main article
        if (!newsId) {
          setNews(null);
          return;
        }
        const response = await fetch(`/api/news/${newsId}`);
        const data = await response.json();
        setNews(data);

        // Fetch related articles
        if (data?.category) {
          const relatedResponse = await fetch(`/api/news?category=${data.category}&status=published&limit=4`);
          const relatedData = await relatedResponse.json();
          setRelatedNews(relatedData?.news?.filter((n: INews) => n._id !== newsId) || []);
        }
      } catch (err) {
        console.error('Error loading news:', err);
      } finally {
        setLoading(false);
      }
    };

    loadNewsDetail();
  }, [newsId]);

  // Format date like BBC
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format relative time
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return formatDate(dateString);
  };

  // Share functions
  const shareArticle = (platform: string) => {
    const url = window.location.href;
    const title = news?.title || '';
    
    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

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
        <div className="max-w-5xl mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600"></div>
            <p className="text-xl font-medium text-gray-700">Loading article...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
            <a href="/" className="text-red-600 hover:text-red-700 font-semibold">Return to Homepage</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-red-600 transition-colors">Home</a>
            <ChevronRight className="h-4 w-4" />
            <a href={`/category/${news.category}`} className="hover:text-red-600 transition-colors">{news.category}</a>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium line-clamp-1">{news.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-5xl mx-auto px-4 py-8">
        {/* Article Header */}
        <header className="mb-8">
          {/* Category Badge */}
          <div className="mb-4">
            <span className={`inline-block px-3 py-1 text-white text-xs font-bold uppercase ${getCategoryColor(news.category)}`}>
              {news.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            {news.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-700 leading-relaxed mb-6 font-medium">
            {news.description}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{formatRelativeTime(news.createdAt)}</span>
            </div>
            {news.readingTime && (
              <>
                <span className="text-gray-300">•</span>
                <span>{news.readingTime} min read</span>
              </>
            )}
            {news.views > 0 && (
              <>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{news.views.toLocaleString()} views</span>
                </div>
              </>
            )}
          </div>

          {/* Share Toolbar */}
          <div className="flex items-center gap-3 py-4">
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
              >
                <Share2 className="h-4 w-4" />
                <span className="font-medium">Share</span>
              </button>

              {/* Share Menu */}
              {showShareMenu && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-10">
                  <button
                    onClick={() => shareArticle('facebook')}
                    className="flex items-center gap-3 px-4 py-2 w-full hover:bg-gray-50 text-left"
                  >
                    <Facebook className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Facebook</span>
                  </button>
                  <button
                    onClick={() => shareArticle('twitter')}
                    className="flex items-center gap-3 px-4 py-2 w-full hover:bg-gray-50 text-left"
                  >
                    <Twitter className="h-4 w-4 text-sky-500" />
                    <span className="text-sm font-medium">Twitter</span>
                  </button>
                  <button
                    onClick={() => shareArticle('linkedin')}
                    className="flex items-center gap-3 px-4 py-2 w-full hover:bg-gray-50 text-left"
                  >
                    <Linkedin className="h-4 w-4 text-blue-700" />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </button>
                  <button
                    onClick={() => shareArticle('email')}
                    className="flex items-center gap-3 px-4 py-2 w-full hover:bg-gray-50 text-left"
                  >
                    <Mail className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium">Email</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                isBookmarked
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
              <span className="font-medium">{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </header>

        {/* Featured Image */}
        {news.image && (
          <figure className="mb-8">
            <img
              src={getImageUrl(news.image)}
              alt={news.title}
              className="w-full h-auto rounded-lg"
            />
            <figcaption className="text-sm text-gray-500 mt-3 italic">
              {news.title}
            </figcaption>
          </figure>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div 
            className="text-gray-800 leading-relaxed"
            style={{ 
              fontSize: '1.125rem',
              lineHeight: '1.75',
              fontFamily: 'Georgia, serif'
            }}
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </div>

        {/* Tags */}
        {news.tags && news.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase">Topics</h3>
            <div className="flex flex-wrap gap-2">
              {news.tags.map((tag, index) => (
                <a
                  key={index}
                  href={`/tag/${tag}`}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded transition-colors"
                >
                  {tag}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Article Footer Stats */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <span className="font-medium">{news.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-5 w-5" />
              <span className="font-medium">{news.likes.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              <span className="font-medium">{news.shares.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedNews.length > 0 && (
        <section className="bg-gray-50 py-12 border-t border-gray-200">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">Related Stories</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedNews.map((related) => (
                <article key={related._id} className="group cursor-pointer bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                  <a href={`/news/${related._id}`} className="block">
                    <div className="relative overflow-hidden bg-gray-100 h-48">
                      <img
                        src={getImageUrl(related.image)}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-bold text-gray-600 uppercase">
                        {related.category}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 mt-2 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {related.description}
                      </p>
                      <div className="text-xs text-gray-500">
                        {formatRelativeTime(related.createdAt)}
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default NewsDetailPage;