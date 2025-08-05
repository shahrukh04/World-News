import express from 'express';
import newsScheduler from '../services/newsScheduler.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Manual trigger for news fetching (admin only)
router.post('/trigger-news-fetch', protect, async (req, res) => {
  try {
    console.log('Manual news fetch triggered by admin');
    await newsScheduler.triggerManualFetch();
    res.json({ 
      message: 'News fetch triggered successfully',
      status: 'success'
    });
  } catch (error) {
    console.error('Error in manual news fetch:', error);
    res.status(500).json({ 
      message: 'Error triggering news fetch',
      error: error.message 
    });
  }
});

// Get scheduler status
router.get('/status', protect, (req, res) => {
  res.json({
    isRunning: newsScheduler.isRunning,
    categories: newsScheduler.categories,
    schedule: 'Daily at 6:00 AM',
    lastRun: 'Check server logs for last execution time'
  });
});

// Stop scheduler (admin only)
router.post('/stop', protect, (req, res) => {
  try {
    newsScheduler.stop();
    res.json({ 
      message: 'News scheduler stopped',
      status: 'stopped'
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error stopping scheduler',
      error: error.message 
    });
  }
});

// Start scheduler (admin only)
router.post('/start', protect, (req, res) => {
  try {
    newsScheduler.start();
    res.json({ 
      message: 'News scheduler started',
      status: 'running'
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error starting scheduler',
      error: error.message 
    });
  }
});

export default router;