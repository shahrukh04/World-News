import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true, enum: ['India', 'World', 'Health', 'Jobs', 'Sports', 'Technology', 'IPO', 'Business', 'Entertainment', 'Other'] },
  description: { type: String, required: true },
  image: { type: String },  // filename or URL of uploaded image
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const News = mongoose.model('News', newsSchema);

export default News;
