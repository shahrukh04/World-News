import Tag from '../models/tagModel.js';
import slugify from 'slugify';
import mongoose from 'mongoose';

// @desc    Get all tags
// @route   GET /api/tags
// @access  Public
export const getTags = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const tags = await Tag.find({})
      .sort({ count: -1, name: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Tag.countDocuments();

    res.json({
      success: true,
      data: {
        tags,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalTags: total,
          hasNextPage: page * limit < total,
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single tag
// @route   GET /api/tags/:id
// @access  Public
export const getTag = async (req, res) => {
  try {
    const identifier = req.params.id;
    const isObjectId = mongoose.Types.ObjectId.isValid(identifier);
    const tag = isObjectId
      ? await Tag.findById(identifier)
      : await Tag.findOne({ slug: identifier });
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json({
      success: true,
      data: { tag }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a tag
// @route   POST /api/tags
// @access  Private/Admin
export const createTag = async (req, res) => {
  try {
    const { name, slug, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Tag name is required' });
    }

    const tagSlug = slug || slugify(name, { lower: true, strict: true });

    const tagExists = await Tag.findOne({ slug: tagSlug });
    if (tagExists) {
      return res.status(200).json({
        success: true,
        message: 'Tag already exists',
        data: { tag: tagExists }
      });
    }

    const tag = await Tag.create({
      name,
      slug: tagSlug,
      description
    });

    res.status(201).json({
      success: true,
      data: { tag }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a tag
// @route   PUT /api/tags/:id
// @access  Private/Admin
export const updateTag = async (req, res) => {
  try {
    const { name, slug, description } = req.body;
    const tag = await Tag.findById(req.params.id);

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    tag.name = name || tag.name;
    if (slug) tag.slug = slug;
    else if (name) tag.slug = slugify(name, { lower: true, strict: true });
    
    if (description !== undefined) tag.description = description;

    const updatedTag = await tag.save();

    res.json({
      success: true,
      data: { tag: updatedTag }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a tag
// @route   DELETE /api/tags/:id
// @access  Private/Admin
export const deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    await tag.deleteOne();

    res.json({
      success: true,
      message: 'Tag removed'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get popular tags
// @route   GET /api/tags/popular
// @access  Public
export const getPopularTags = async (req, res) => {
  try {
    const tags = await Tag.find({})
      .sort({ count: -1 })
      .limit(10);

    res.json({
      success: true,
      data: { tags }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
