import express from 'express';
import userRoutes from './routes/userRoute.js';
import newsRoutes from './routes/newsRoute.js';
import schedulerRoutes from './routes/schedulerRoute.js';
import mongoose from 'mongoose';

const router = express.Router();

// Health check endpoint
router.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const dbStates = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.json({
    status: 'Server is running',
    database: {
      status: dbStates[dbStatus] || 'unknown',
      connected: dbStatus === 1
    },
    timestamp: new Date().toISOString()
  });
});

router.use('/api/users', userRoutes);
router.use('/api/news', newsRoutes);
router.use('/api/scheduler', schedulerRoutes);

export default router;
