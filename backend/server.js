import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import compression from 'compression';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import mainRoutes from './mainRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import newsScheduler from './services/newsScheduler.js';

// Load environment-specific configuration
const NODE_ENV = process.env.NODE_ENV || 'development';
if (NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config({ path: '.env.local' });
}

// Fallback to default .env if specific env file doesn't exist
dotenv.config();

connectDB();

const app = express();

// To use __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5000',
    'http://127.0.0.1:5000',
    'http://localhost:3001',
    'http://127.0.0.1:3001',
    'https://worldnew.in',
    'https://world-news.vercel.app'
  ];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes('*')) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    if (/\.vercel\.app$/.test(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// HTTP response compression (gzip) for faster network transfer
// compression is already listed in package.json dependencies
app.use(compression());

// Serve uploaded images statically with caching headers
app.use('/uploads', express.static(path.join(__dirname, '/uploads'), {
  maxAge: '1y', // Cache for 1 year
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    // Set cache headers for images
    if (path.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.setHeader('Vary', 'Accept-Encoding');
    }
  }
}));

// If a built frontend exists (frontend/dist), serve it as static assets in production
// This allows the backend to serve the built SPA with proper caching when deployed together.
let frontendFallback = null;
try {
  const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
  if (fs.existsSync(frontendDist)) {
    app.use(express.static(frontendDist, {
      maxAge: '1y',
      etag: true,
      lastModified: true,
      setHeaders: (res, filePath) => {
        // Serve immutable assets with long cache headers
        if (filePath.match(/\.[a-f0-9]{8}\.[^.]+$/)) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
      }
    }));

    // SPA fallback to index.html - will be registered after mainRoutes
    frontendFallback = () => {
      app.get('*', (req, res, next) => {
        const indexHtml = path.join(frontendDist, 'index.html');
        if (fs.existsSync(indexHtml)) {
          res.sendFile(indexHtml);
        } else {
          next();
        }
      });
    };
  }
} catch (err) {
  console.warn('Could not configure frontend static serving:', err);
}

// Routes - API routes must be registered BEFORE the SPA fallback
app.use(mainRoutes);

// Register SPA fallback AFTER API routes so /api/* requests aren't caught by the wildcard
if (frontendFallback) {
  frontendFallback();
}

// Error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Start the automated news scheduler
  newsScheduler.start();
  console.log('Automated news scheduler initialized');
});
