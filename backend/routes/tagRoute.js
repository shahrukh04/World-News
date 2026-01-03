import express from 'express';
import {
  getTags,
  createTag,
  getTag,
  updateTag,
  deleteTag,
  getPopularTags
} from '../controllers/tagController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getTags)
  .post(protect, createTag);

router.get('/popular', getPopularTags);

router.route('/:id')
  .get(getTag)
  .put(protect, updateTag)
  .delete(protect, deleteTag);

export default router;
