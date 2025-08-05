import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import mainRoutes from './mainRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import newsScheduler from './services/newsScheduler.js';

dotenv.config();
connectDB();

const app = express();

// To use __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Routes
app.use(mainRoutes);

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
