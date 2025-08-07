import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNewsById, INews } from '../../services/api';
import { getImageUrl } from '../../utils/imageUtils';
import Sidebar from '../../components/common/Sidebar';
import SimpleAd from '../../components/SimpleAd';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [news, setNews] = useState<INews | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      if (!id) {
        setError('News ID not provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const newsData = await fetchNewsById(id);
        setNews(newsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news article. The article may not exist or there was a network error.');
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 w-full lg:w-auto p-4 lg:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded mb-4"></div>
              <div className="h-64 bg-gray-300 rounded mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 lg:p-6 text-center">
              <h2 className="text-lg lg:text-xl font-semibold text-red-800 mb-2">Article Not Found</h2>
              <p className="text-sm lg:text-base text-red-600 mb-4">{error}</p>
              <button
                onClick={() => navigate('/')}
                className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm lg:text-base"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-8 lg:py-12">
              <h2 className="text-lg lg:text-xl font-semibold text-gray-800 mb-2">News article not found</h2>
              <button
                onClick={() => navigate('/')}
                className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm lg:text-base"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const fallbackImage = '/placeholder-image.svg';
  const imageUrl = getImageUrl(news.image);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 w-full lg:w-auto p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-4 lg:mb-6">
            <button
              onClick={() => navigate('/')}
              className="text-blue-600 hover:text-blue-800 transition-colors text-sm lg:text-base"
            >
              ← Back to News
            </button>
          </nav>

          {/* Article Header */}
          <article className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 lg:p-6">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {news.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {news.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm text-gray-500 mb-4 lg:mb-6 space-y-1 sm:space-y-0">
                <span>Published on {new Date(news.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>

              </div>

              {/* Featured Image */}
              {news.image && !imageError && (
                <div className="mb-6">
                  <img
                    src={imageUrl}
                    alt={news.title}
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg"
                    onError={() => setImageError(true)}
                  />
                </div>
              )}
              {(!news.image || imageError) && (
                <div className="mb-6">
                  <img
                    src={fallbackImage}
                    alt={news.title}
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg opacity-75"
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="prose max-w-none">
                <div className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {news.description}
                </div>
              </div>

              {/* Ad Space */}
              <div className="my-8">
                <SimpleAd 
              style={{ textAlign: 'center' }}
              className="w-full"
            />
              </div>

              {/* Share Section */}
              <div className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-gray-200">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">Share this article</h3>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  <button
                    onClick={() => {
                      const url = window.location.href;
                      const text = `Check out this article: ${news.title}`;
                      if (navigator.share) {
                        navigator.share({ title: news.title, text, url });
                      } else {
                        navigator.clipboard.writeText(url);
                        alert('Link copied to clipboard!');
                      }
                    }}
                    className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm sm:text-base"
                  >
                    Share
                  </button>
                  <button
                    onClick={() => {
                      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(news.title)}&url=${encodeURIComponent(window.location.href)}`;
                      window.open(twitterUrl, '_blank');
                    }}
                    className="bg-sky-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-sky-600 transition-colors text-sm sm:text-base"
                  >
                    Tweet
                  </button>
                  <button
                    onClick={() => {
                      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
                      window.open(facebookUrl, '_blank');
                    }}
                    className="bg-blue-800 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-900 transition-colors text-sm sm:text-base"
                  >
                    Facebook
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Related Articles Section */}
          <div className="mt-6 lg:mt-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 lg:mb-4">Related Articles</h2>
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
              <p className="text-sm lg:text-base text-gray-600">More articles from the {news.category} category coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;