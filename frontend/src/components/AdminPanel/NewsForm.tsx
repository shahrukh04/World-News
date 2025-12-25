import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '../common/Button';
import { createNews, updateNews, analyzeSEO, INewsCreate, INews } from '../../services/api';
import { Eye, Search, TrendingUp, Globe, FileText, BarChart3 } from 'lucide-react';

const categories = ['India', 'World', 'Health', 'Jobs', 'Sports', 'Technology', 'IPO', 'Business', 'Entertainment', 'Other'];

interface NewsFormProps {
  editNews?: INews;
  onSuccess?: () => void;
}

const NewsForm: React.FC<NewsFormProps> = ({ editNews, onSuccess }) => {
  // Basic fields
  const [title, setTitle] = useState(editNews?.title || '');
  const [category, setCategory] = useState(editNews?.category || 'India');
  const [description, setDescription] = useState(editNews?.description || '');
  const [content, setContent] = useState(editNews?.content || editNews?.contentChunks?.join('') || '');
  const [excerpt, setExcerpt] = useState(editNews?.excerpt || '');
  const [image, setImage] = useState<File | null>(null);
  
  // SEO fields
  const [metaTitle, setMetaTitle] = useState(editNews?.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(editNews?.metaDescription || '');
  const [keywords, setKeywords] = useState<string[]>(editNews?.keywords || []);
  const [focusKeyword, setFocusKeyword] = useState(editNews?.focusKeyword || '');
  const [canonicalUrl, setCanonicalUrl] = useState(editNews?.canonicalUrl || '');
  
  // Social media fields
  const [ogTitle, setOgTitle] = useState(editNews?.ogTitle || '');
  const [ogDescription, setOgDescription] = useState(editNews?.ogDescription || '');
  const [twitterTitle, setTwitterTitle] = useState(editNews?.twitterTitle || '');
  const [twitterDescription, setTwitterDescription] = useState(editNews?.twitterDescription || '');
  
  // Content fields
  const [tags, setTags] = useState<string[]>(editNews?.tags || []);
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>(editNews?.status || 'draft');
  const [featured, setFeatured] = useState(editNews?.featured || false);
  const [trending, setTrending] = useState(editNews?.trending || false);
  
  // Form state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [seoAnalysis, setSeoAnalysis] = useState<any>(null);
  const [keywordInput, setKeywordInput] = useState('');
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (!editNews) {
      setTitle('');
      setCategory('India');
      setDescription('');
      setContent('');
      setExcerpt('');
      setImage(null);
      setMetaTitle('');
      setMetaDescription('');
      setKeywords([]);
      setFocusKeyword('');
      setCanonicalUrl('');
      setOgTitle('');
      setOgDescription('');
      setTwitterTitle('');
      setTwitterDescription('');
      setTags([]);
      setStatus('draft');
      setFeatured(false);
      setTrending(false);
      setMessage(null);
      setSeoAnalysis(null);
      setActiveTab('basic');
      return;
    }

    setTitle(editNews.title || '');
    setCategory(editNews.category || 'India');
    setDescription(editNews.description || '');
    setContent(editNews.content || editNews.contentChunks?.join('') || '');
    setExcerpt(editNews.excerpt || '');
    setImage(null);
    setMetaTitle(editNews.metaTitle || '');
    setMetaDescription(editNews.metaDescription || '');
    setKeywords(editNews.keywords || []);
    setFocusKeyword(editNews.focusKeyword || '');
    setCanonicalUrl(editNews.canonicalUrl || '');
    setOgTitle(editNews.ogTitle || '');
    setOgDescription(editNews.ogDescription || '');
    setTwitterTitle(editNews.twitterTitle || '');
    setTwitterDescription(editNews.twitterDescription || '');
    setTags(editNews.tags || []);
    setStatus(editNews.status || 'draft');
    setFeatured(!!editNews.featured);
    setTrending(!!editNews.trending);
    setMessage(null);
  }, [editNews]);

  // Auto-generate SEO fields
  useEffect(() => {
    if (title && !metaTitle) {
      setMetaTitle(title.length > 60 ? title.substring(0, 57) + '...' : title);
    }
    if (title && !ogTitle) {
      setOgTitle(title.length > 60 ? title.substring(0, 57) + '...' : title);
    }
    if (title && !twitterTitle) {
      setTwitterTitle(title.length > 60 ? title.substring(0, 57) + '...' : title);
    }
  }, [title]);

  useEffect(() => {
    if (description && !metaDescription) {
      setMetaDescription(description.length > 160 ? description.substring(0, 157) + '...' : description);
    }
    if (description && !ogDescription) {
      setOgDescription(description.length > 160 ? description.substring(0, 157) + '...' : description);
    }
    if (description && !twitterDescription) {
      setTwitterDescription(description.length > 160 ? description.substring(0, 157) + '...' : description);
    }
  }, [description]);

  // SEO Analysis
  useEffect(() => {
    if (content) {
      const runAnalysis = async () => {
        const analysis = await analyzeSEO(content, focusKeyword);
        setSeoAnalysis(analysis);
      };
      runAnalysis();
    }
  }, [content, focusKeyword]);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title || !description || !content) {
      setMessage('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const newsData: INewsCreate = {
        title,
        category,
        description,
        content,
        excerpt,
        metaTitle,
        metaDescription,
        keywords,
        focusKeyword,
        canonicalUrl,
        ogTitle,
        ogDescription,
        twitterTitle,
        twitterDescription,
        tags,
        status,
        featured,
        trending,
        image: image || undefined,
      };

      if (editNews) {
        await updateNews(editNews._id, newsData);
        setMessage('News updated successfully');
      } else {
        await createNews(newsData);
        setMessage('News created successfully');
        // Reset form
        setTitle('');
        setCategory('India');
        setDescription('');
        setContent('');
        setExcerpt('');
        setImage(null);
        setMetaTitle('');
        setMetaDescription('');
        setKeywords([]);
        setFocusKeyword('');
        setCanonicalUrl('');
        setOgTitle('');
        setOgDescription('');
        setTwitterTitle('');
        setTwitterDescription('');
        setTags([]);
        setStatus('draft');
        setFeatured(false);
        setTrending(false);
      }
      
      onSuccess?.();
    } catch (error) {
      setMessage('Error saving news');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: FileText },
    { id: 'content', label: 'Content', icon: Globe },
    { id: 'seo', label: 'SEO', icon: Search },
    { id: 'social', label: 'Social Media', icon: TrendingUp },
    { id: 'advanced', label: 'Advanced', icon: BarChart3 },
  ];

  return (
    <>
      <Helmet>
        <title>{editNews ? 'Edit News' : 'Create News'} - Admin Panel</title>
      </Helmet>
      
      <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {editNews ? 'Edit News Article' : 'Create New Article'}
          </h2>
          {seoAnalysis && (
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <FileText className="h-4 w-4 text-gray-500" />
                <span>{seoAnalysis.wordCount} words</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4 text-gray-500" />
                <span>{seoAnalysis.readingTime} min read</span>
              </div>
              <div className="flex items-center space-x-1">
                <BarChart3 className="h-4 w-4 text-gray-500" />
                <span className={`font-medium ${
                  seoAnalysis.seoScore >= 80 ? 'text-green-600' :
                  seoAnalysis.seoScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  SEO: {seoAnalysis.seoScore}%
                </span>
              </div>
            </div>
          )}
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded ${
            message.includes('success') 
              ? 'bg-green-100 text-green-700 border border-green-300' 
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}>
            {message}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                    placeholder="Enter article title..."
                  />
                  <p className="text-xs text-gray-500 mt-1">{title.length}/60 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                  placeholder="Brief description of the article..."
                />
                <p className="text-xs text-gray-500 mt-1">{description.length}/160 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Excerpt
                </label>
                <textarea
                  value={excerpt}
                  onChange={e => setExcerpt(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Short excerpt for article previews..."
                />
                <p className="text-xs text-gray-500 mt-1">{excerpt.length}/300 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Featured Image
                </label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={onFileChange}
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <p className="text-xs text-gray-500 mt-1">Recommended: 1200x630px for optimal social sharing</p>
              </div>
            </div>
          )}

          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Article Content *
                </label>
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md h-96 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                  placeholder="Write your full article content here..."
                />
                {seoAnalysis && (
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                    <span>{seoAnalysis.wordCount} words • {seoAnalysis.readingTime} min read</span>
                    <span className={`font-medium ${
                      seoAnalysis.wordCount >= 300 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {seoAnalysis.wordCount >= 300 ? '✓ Good length' : '⚠ Too short for SEO'}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Focus Keyword
                </label>
                <input
                  type="text"
                  value={focusKeyword}
                  onChange={e => setFocusKeyword(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Main keyword for SEO optimization..."
                />
                {focusKeyword && content && (
                  <p className={`text-xs mt-1 ${
                    content.toLowerCase().includes(focusKeyword.toLowerCase()) 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {content.toLowerCase().includes(focusKeyword.toLowerCase()) 
                      ? '✓ Focus keyword found in content' 
                      : '⚠ Focus keyword not found in content'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-100"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Add tags..."
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SEO Tab */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={e => setMetaTitle(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="SEO title for search engines..."
                  />
                  <p className={`text-xs mt-1 ${
                    metaTitle.length > 60 ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {metaTitle.length}/60 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Canonical URL
                  </label>
                  <input
                    type="url"
                    value={canonicalUrl}
                    onChange={e => setCanonicalUrl(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="https://worldnew.in/news/article-slug"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={metaDescription}
                  onChange={e => setMetaDescription(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Description for search engine results..."
                />
                <p className={`text-xs mt-1 ${
                  metaDescription.length > 160 ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {metaDescription.length}/160 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Keywords
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => removeKeyword(keyword)}
                        className="ml-1 text-green-600 hover:text-green-800 dark:text-green-300 dark:hover:text-green-100"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={e => setKeywordInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                    className="flex-1 border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Add SEO keywords..."
                  />
                  <button
                    type="button"
                    onClick={addKeyword}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Social Media Tab */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">Open Graph (Facebook)</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      OG Title
                    </label>
                    <input
                      type="text"
                      value={ogTitle}
                      onChange={e => setOgTitle(e.target.value)}
                      className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Title for Facebook sharing..."
                    />
                    <p className="text-xs text-gray-500 mt-1">{ogTitle.length}/60 characters</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      OG Description
                    </label>
                    <textarea
                      value={ogDescription}
                      onChange={e => setOgDescription(e.target.value)}
                      className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Description for Facebook sharing..."
                    />
                    <p className="text-xs text-gray-500 mt-1">{ogDescription.length}/160 characters</p>
                  </div>
                </div>
              </div>

              <div className="bg-sky-50 dark:bg-sky-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-sky-900 dark:text-sky-100 mb-2">Twitter Cards</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Twitter Title
                    </label>
                    <input
                      type="text"
                      value={twitterTitle}
                      onChange={e => setTwitterTitle(e.target.value)}
                      className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Title for Twitter sharing..."
                    />
                    <p className="text-xs text-gray-500 mt-1">{twitterTitle.length}/60 characters</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Twitter Description
                    </label>
                    <textarea
                      value={twitterDescription}
                      onChange={e => setTwitterDescription(e.target.value)}
                      className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Description for Twitter sharing..."
                    />
                    <p className="text-xs text-gray-500 mt-1">{twitterDescription.length}/160 characters</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Advanced Tab */}
          {activeTab === 'advanced' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value as 'draft' | 'published' | 'archived')}
                    className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={featured}
                    onChange={e => setFeatured(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Featured Article
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="trending"
                    checked={trending}
                    onChange={e => setTrending(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="trending" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Trending Article
                  </label>
                </div>
              </div>

              {seoAnalysis && (
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">SEO Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{seoAnalysis.wordCount}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Words</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{seoAnalysis.readingTime}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Minutes</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${
                        seoAnalysis.seoScore >= 80 ? 'text-green-600' :
                        seoAnalysis.seoScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {seoAnalysis.seoScore}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">SEO Score</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              onClick={() => setStatus('draft')}
              className="bg-gray-600 hover:bg-gray-700"
              disabled={loading}
            >
              Save as Draft
            </Button>
            <Button
              type="submit"
              onClick={() => setStatus('published')}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'Publishing...' : 'Publish Article'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewsForm;
