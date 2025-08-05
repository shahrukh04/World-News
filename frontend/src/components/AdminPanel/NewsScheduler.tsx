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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl mb-6 font-semibold">Automated News Scheduler</h2>
      
      {message && (
        <div className={`mb-4 p-3 rounded ${
          messageType === 'success' 
            ? 'bg-green-100 text-green-700 border border-green-300' 
            : 'bg-red-100 text-red-700 border border-red-300'
        }`}>
          {message}
        </div>
      )}

      {status && (
        <div className="mb-6 p-4 bg-gray-50 rounded">
          <h3 className="text-lg font-semibold mb-3">Scheduler Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>Status:</strong> 
                <span className={`ml-2 px-2 py-1 rounded text-sm ${
                  status.isRunning 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {status.isRunning ? 'Running' : 'Stopped'}
                </span>
              </p>
              <p><strong>Schedule:</strong> {status.schedule}</p>
            </div>
            <div>
              <p><strong>Categories:</strong></p>
              <div className="flex flex-wrap gap-1 mt-1">
                {status.categories.map((category) => (
                  <span key={category} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">How it works</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>Automatically fetches 10 trending news articles daily at 6:00 AM</li>
            <li>Covers all categories: India, World, Health, Jobs, and Other</li>
            <li>Uses multiple news APIs for comprehensive coverage</li>
            <li>Prevents duplicate articles by checking existing titles</li>
            <li>Falls back to mock data if external APIs are unavailable</li>
          </ul>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={handleTriggerFetch} 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading ? 'Fetching...' : 'Trigger Manual Fetch'}
          </Button>
          
          {status?.isRunning ? (
            <Button 
              onClick={handleStopScheduler} 
              disabled={loading}
              className="bg-red-600 hover:bg-red-700"
            >
              Stop Scheduler
            </Button>
          ) : (
            <Button 
              onClick={handleStartScheduler} 
              disabled={loading}
              className="bg-green-600 hover:bg-green-700"
            >
              Start Scheduler
            </Button>
          )}
          
          <Button 
            onClick={fetchStatus} 
            disabled={loading}
            className="bg-gray-600 hover:bg-gray-700"
          >
            Refresh Status
          </Button>
        </div>

        <div className="bg-yellow-50 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">API Configuration</h3>
          <p className="text-sm text-gray-700 mb-2">
            To use real news APIs, add these environment variables to your backend .env file:
          </p>
          <div className="bg-gray-100 p-3 rounded font-mono text-sm">
            <div>NEWS_API_KEY=your_newsapi_key_from_newsapi.org</div>
            <div>GNEWS_API_KEY=your_gnews_key_from_gnews.io</div>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Without these keys, the system will use mock data for testing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsScheduler;