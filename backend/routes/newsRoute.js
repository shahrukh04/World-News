import express from 'express';
import {
  createNews,
  getNews,
  getNewsById,
  deleteNews,
} from '../controllers/newsController.js';
import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';
import path from 'path';

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.route('/')
  .get(getNews)
  .post(protect, upload.single('image'), createNews);

router.route('/:id')
  .get(getNewsById)
  .delete(protect, deleteNews);

export default router;
