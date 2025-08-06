import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import api from '../../api/api';

interface SchedulerStatus {
  isRunning: boolean;
  categories: string[];
  schedule: string;
  lastRun: string;
}

const NewsScheduler = () => {
  const [status, setStatus] = useState<SchedulerStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const fetchStatus = async () => {
    try {
      const response = await api.get('/scheduler/status');
      setStatus(response.data);
    } catch (error) {
      console.error('Error fetching scheduler status:', error);
      setMessage('Error fetching scheduler status');
      setMessageType('error');
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const showMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(null), 5000);
  };

  const handleTriggerFetch = async () => {
    setLoading(true);
    try {
      const response = await api.post('/scheduler/trigger-news-fetch');
      showMessage(response.data.message, 'success');
      await fetchStatus();
    } catch (error: any) {
      showMessage(error.response?.data?.message || 'Error triggering news fetch', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStartScheduler = async () => {
    setLoading(true);
    try {
      const response = await api.post('/scheduler/start');
      showMessage(response.data.message, 'success');
      await fetchStatus();
    } catch (error: any) {
      showMessage(error.response?.data?.message || 'Error starting scheduler', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStopScheduler = async () => {
    setLoading(true);
    try {
      const response = await api.post('/scheduler/stop');
      showMessage(response.data.message, 'success');
      await fetchStatus();
    } catch (error: any) {
      showMessage(error.response?.data?.message || 'Error stopping scheduler', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">News Scheduler</h1>
      </div>
      
      {message && (
        <div className={`p-4 rounded-lg border ${
          messageType === 'success' 
            ? 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' 
            : 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
        }`}>
          {message}
        </div>
      )}

      {status && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Scheduler Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-3">Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  status.isRunning 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                }`}>
                  {status.isRunning ? 'Running' : 'Stopped'}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Schedule: </span>
                <span className="text-sm text-gray-900 dark:text-white">{status.schedule}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Run: </span>
                <span className="text-sm text-gray-900 dark:text-white">
                  {status.lastRun ? new Date(status.lastRun).toLocaleString() : 'Never'}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Categories:</p>
              <div className="flex flex-wrap gap-2">
                {status.categories.map((category) => (
                  <span key={category} className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded-full text-sm font-medium">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">How it works</h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Automatically fetches 10 trending news articles daily at 6:00 AM
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Covers all categories: India, World, Health, Jobs, Sports, Technology, IPO, Business, Entertainment, and Other
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Uses multiple news APIs for comprehensive coverage
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Prevents duplicate articles by checking existing titles
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Falls back to mock data if external APIs are unavailable
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={handleTriggerFetch} 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {loading ? 'Fetching...' : 'Trigger Manual Fetch'}
            </Button>
            
            {status?.isRunning ? (
              <Button 
                onClick={handleStopScheduler} 
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Stop Scheduler
              </Button>
            ) : (
              <Button 
                onClick={handleStartScheduler} 
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Start Scheduler
              </Button>
            )}
            
            <Button 
              onClick={fetchStatus} 
              disabled={loading}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              Refresh Status
            </Button>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-amber-800 dark:text-amber-400">API Configuration</h3>
          <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
            To use real news APIs, add these environment variables to your backend .env file:
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm border">
            <div className="text-gray-800 dark:text-gray-200">NEWS_API_KEY=your_newsapi_key_from_newsapi.org</div>
            <div className="text-gray-800 dark:text-gray-200">GNEWS_API_KEY=your_gnews_key_from_gnews.io</div>
          </div>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-3">
            Without these keys, the system will use mock data for testing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsScheduler;