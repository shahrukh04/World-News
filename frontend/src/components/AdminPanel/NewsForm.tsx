import React, { useState, ChangeEvent, FormEvent } from 'react';
import Button from '../common/Button';
import { createNews } from '../../services/api';

const categories = ['India', 'World', 'Health', 'Jobs', 'Sports', 'Technology', 'IPO', 'Business', 'Entertainment', 'Other'];

const NewsForm = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('India');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      setMessage('Please fill title and description');
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await createNews({ title, category, description, image: image || undefined });
      setMessage('News created successfully');
      setTitle('');
      setCategory('India');
      setDescription('');
      setImage(null);
    } catch (error) {
      setMessage('Error creating news');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl mb-6 font-semibold">Create News</h2>

      {message && <div className="mb-4 text-center text-red-600">{message}</div>}

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Title</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Category</label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded h-32"
          required
        ></textarea>
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-semibold">Image (optional)</label>
        <input type="file" accept="image/*" onChange={onFileChange} />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Posting...' : 'Post News'}
      </Button>
    </form>
  );
};

export default NewsForm;
