import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { fetchAllNews, INews } from '../../services/api';
import NewsForm from '../../components/AdminPanel/NewsForm';
import Button from '../../components/common/Button';
import {
  FileText,
  Globe,
  Calendar,
  Eye,
  Share2,
  Heart,
  Settings,
  Users,
  BarChart3,
  Search,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [recentArticles, setRecentArticles] = useState<INews[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState<INews | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  // Stats state
  const [stats, setStats] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    totalViews: 0,
    totalShares: 0,
    totalLikes: 0
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const articles = await fetchAllNews();
      
      // Get recent articles (last 10)
      const recent = articles.slice(0, 10);
      setRecentArticles(recent);
      
      // Calculate stats
      const totalArticles = articles.length;
      const publishedArticles = articles.filter(a => a.status === 'published').length;
      const draftArticles = articles.filter(a => a.status === 'draft').length;
      const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);
      const totalShares = articles.reduce((sum, a) => sum + (a.shares || 0), 0);
      const totalLikes = articles.reduce((sum, a) => sum + (a.likes || 0), 0);
      
      setStats({
        totalArticles,
        publishedArticles,
        draftArticles,
        totalViews,
        totalShares,
        totalLikes
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditArticle = (article: INews) => {
    setEditingArticle(article);
    setShowForm(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleNewArticle = () => {
    setEditingArticle(null);
    setShowForm(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleFormSuccess = () => {
    setEditingArticle(null);
    setShowForm(false);
    loadDashboardData(); // Refresh the data
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingArticle(null);
    setShowForm(false);
  };

  const StatCard = ({ title, value, icon: Icon, color, change }: any) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value.toLocaleString()}</p>
          {change && (
            <p className={`text-xs ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - World News</title>
        <meta name="description" content="Manage your news articles, SEO settings, and analytics" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Welcome back, {user?.username || user?.firstName || 'Admin'}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleNewArticle}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Article</span>
            </Button>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Last updated: {new Date().toLocaleString()}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          <StatCard
            title="Total Articles"
            value={stats.totalArticles}
            icon={FileText}
            color="bg-blue-500"
            change={12}
          />
          <StatCard
            title="Published"
            value={stats.publishedArticles}
            icon={Globe}
            color="bg-green-500"
            change={8}
          />
          <StatCard
            title="Drafts"
            value={stats.draftArticles}
            icon={Calendar}
            color="bg-yellow-500"
            change={-3}
          />
          <StatCard
            title="Total Views"
            value={stats.totalViews}
            icon={Eye}
            color="bg-purple-500"
            change={25}
          />
          <StatCard
            title="Total Shares"
            value={stats.totalShares}
            icon={Share2}
            color="bg-indigo-500"
            change={15}
          />
          <StatCard
            title="Total Likes"
            value={stats.totalLikes}
            icon={Heart}
            color="bg-red-500"
            change={20}
          />
        </div>

        {/* Quick Actions & Recent Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
                <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              Quick Actions
            </h2>
            <div className="space-y-4">
              <Button asChild className="w-full justify-start h-14 text-left font-medium bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 border border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
                <Link to="/admin/users">
                  <span className="flex items-center">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg mr-4">
                      <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="text-gray-900 dark:text-white font-semibold">Manage Admin Users</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Add, edit, or remove admin accounts</div>
                    </div>
                  </span>
                </Link>
              </Button>
              <Button asChild className="w-full justify-start h-14 text-left font-medium bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 border border-green-200 dark:border-green-700 hover:border-green-300 dark:hover:border-green-600 transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
                <Link to="/admin/scheduler">
                  <span className="flex items-center">
                    <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg mr-4">
                      <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="text-gray-900 dark:text-white font-semibold">News Scheduler</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Schedule articles for future publishing</div>
                    </div>
                  </span>
                </Link>
              </Button>
              <Button asChild className="w-full justify-start h-14 text-left font-medium bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 hover:from-purple-100 hover:to-violet-100 dark:hover:from-purple-900/30 dark:hover:to-violet-900/30 border border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
                <Link to="/admin/analytics">
                  <span className="flex items-center">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg mr-4">
                      <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="text-gray-900 dark:text-white font-semibold">Analytics Dashboard</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">View website traffic and engagement</div>
                    </div>
                  </span>
                </Link>
              </Button>
              <Button asChild className="w-full justify-start h-14 text-left font-medium bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 hover:from-orange-100 hover:to-amber-100 dark:hover:from-orange-900/30 dark:hover:to-amber-900/30 border border-orange-200 dark:border-orange-700 hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
                <Link to="/admin/seo">
                  <span className="flex items-center">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/40 rounded-lg mr-4">
                      <Search className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <div className="text-gray-900 dark:text-white font-semibold">SEO Management</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Optimize content for search engines</div>
                    </div>
                  </span>
                </Link>
              </Button>
              <Button asChild className="w-full justify-start h-14 text-left font-medium bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 hover:from-teal-100 hover:to-cyan-100 dark:hover:from-teal-900/30 dark:hover:to-cyan-900/30 border border-teal-200 dark:border-teal-700 hover:border-teal-300 dark:hover:border-teal-600 transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
                <Link to="/" target="_blank">
                  <span className="flex items-center">
                    <div className="p-2 bg-teal-100 dark:bg-teal-900/40 rounded-lg mr-4">
                      <Eye className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <div className="text-gray-900 dark:text-white font-semibold">Preview Website</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">View your site as visitors see it</div>
                    </div>
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Recent Articles with Edit */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Recent Articles
              </h2>
              <Button
                variant="secondary"
                className="h-8 px-3 py-2 text-sm"
                onClick={() => loadDashboardData()}
              >
                Refresh
              </Button>
            </div>
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse flex space-x-4">
                    <div className="rounded-md bg-gray-300 h-12 w-16"></div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {recentArticles.map((article) => (
                  <div key={article._id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors group">
                    {article.image && (
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="h-12 w-16 object-cover rounded-md"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {article.title}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <span className={`px-2 py-1 rounded-full ${
                          article.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {article.status}
                        </span>
                        <span>{article.category}</span>
                        <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Eye className="h-3 w-3" />
                      <span>{article.views || 0}</span>
                    </div>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="secondary"
                        className="h-8 w-8 text-sm"
                        onClick={() => handleEditArticle(article)}
                        size="sm"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this article?')) {
                            // Add delete functionality here
                            console.log('Delete article:', article._id);
                          }
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <span className="text-gray-700 dark:text-gray-300">Backend API</span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 rounded-full text-xs font-medium">Online</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <span className="text-gray-700 dark:text-gray-300">Database</span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 rounded-full text-xs font-medium">Connected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Form Section */}
      {showForm && (
        <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {editingArticle ? 'Edit Article' : 'Add New Article'}
            </h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Back to Top
              </Button>
            </div>
          </div>
          <NewsForm 
            editNews={editingArticle || undefined}
            onSuccess={handleFormSuccess}
          />
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
