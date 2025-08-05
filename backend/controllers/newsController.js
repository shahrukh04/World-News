import News from '../models/newsModel.js';

// Create news (admin only)
export const createNews = async (req, res) => {
  const { title, category, description } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const news = new News({
      title,
      category,
      description,
      image,
      author: req.user._id,
    });

    const createdNews = await news.save();
    res.status(201).json(createdNews);
  } catch (error) {
    res.status(400).json({ message: 'Invalid news data' });
  }
};

// Get all news optionally filter by category
export const getNews = async (req, res) => {
  try {
    const category = req.query.category;
    let filter = {};
    if (category) filter.category = category;

    const news = await News.find(filter).sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ 
      message: 'Database connection error', 
      error: error.message 
    });
  }
};

// Get news by id
export const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (news) {
      res.json(news);
    } else {
      res.status(404).json({ message: 'News not found' });
    }
  } catch (error) {
    console.error('Error fetching news by ID:', error.message);
    res.status(500).json({ 
      message: 'Database connection error', 
      error: error.message 
    });
  }
};

// Delete news by id (admin only)
export const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (news) {
      await news.remove();
      res.json({ message: 'News removed' });
    } else {
      res.status(404).json({ message: 'News not found' });
    }
  } catch (error) {
    console.error('Error deleting news:', error.message);
    res.status(500).json({ 
      message: 'Database connection error', 
      error: error.message 
    });
  }
};
