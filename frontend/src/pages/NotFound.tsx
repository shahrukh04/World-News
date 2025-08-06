import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/ui/Button';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | World News</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to World News homepage for the latest breaking news and updates." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="text-8xl font-bold text-red-600 mb-4">404</div>
            <div className="text-6xl mb-4">📰</div>
          </div>
          
          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link to="/" className="flex items-center justify-center gap-2">
                <Home className="h-4 w-4" />
                Go to Homepage
              </Link>
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline" asChild className="flex-1">
                <Link to="javascript:history.back()" className="flex items-center justify-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Go Back
                </Link>
              </Button>
              
              <Button variant="outline" asChild className="flex-1">
                <Link to="/search" className="flex items-center justify-center gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Popular Links */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Popular Sections</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link to="/world-news" className="text-blue-600 hover:underline">
                World News
              </Link>
              <Link to="/india-news" className="text-blue-600 hover:underline">
                India News
              </Link>
              <Link to="/health-news" className="text-blue-600 hover:underline">
                Health News
              </Link>
              <Link to="/sports-news" className="text-blue-600 hover:underline">
                Sports News
              </Link>
              <Link to="/technology-news" className="text-blue-600 hover:underline">
                Technology
              </Link>
              <Link to="/jobs-news" className="text-blue-600 hover:underline">
                Jobs News
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;