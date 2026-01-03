import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  count: { type: Number, default: 0 }
}, { timestamps: true });

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;
