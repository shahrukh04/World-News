import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { postService } from '@/services/postService'
import { categoryService } from '@/services/categoryService'
import { tagService } from '@/services/tagService'
import type { Post, Category, Tag } from '@/types'

import { compressImage } from '@/utils/imageUtils'

const CreatePostPage = () => {
  const ALLOWED_CATEGORY_NAMES = ['India','World','Health','Jobs','Sports','Technology','IPO','Business','Entertainment','Other']
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [smartFillText, setSmartFillText] = useState('')
  const [pendingCategoryName, setPendingCategoryName] = useState('')
  const [pendingTags, setPendingTags] = useState<string[]>([])
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [] as string[],
    featuredImage: '',
    imageAlt: '',
    status: 'draft' as Post['status'],
    seoTitle: '',
    metaDescription: '',
    focusKeyword: '',
    allowComments: true,
    isPinned: false,
    adSenseEnabled: true,
    affiliateEnabled: true
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Fetch categories and tags on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingData(true)
        const [categoriesRes, tagsRes] = await Promise.all([
          categoryService.getCategories({ limit: 100 }),
          tagService.getTags({ limit: 100 })
        ])
        setCategories(categoriesRes.categories)
        setTags(tagsRes.tags)
      } catch (error) {
        console.error('Error fetching data:', error)
        setErrors({ fetch: 'Failed to load categories and tags' })
      } finally {
        setIsLoadingData(false)
      }
    }

    fetchData()
  }, [])

  const validateForm = () => {
    // Relaxed validation - return true without strict checks
    
    return true
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const compressed = await compressImage(file);
        setImageFile(compressed);
        // Also set URL for preview if needed, but we'll use file for upload
      } catch (err) {
        console.error("Compression failed", err);
        setImageFile(file);
      }
    }
  }

  const handleSmartFill = (text: string) => {
    setSmartFillText(text);
    if (!text) return;

    // Check for Emoji format (User provided format)
    if (/📰|📂|📝|✏️|🏷️|🔎/.test(text)) {
      const newDat: any = {};
      
      // Improved extractor that searches for specific headers
      const extractSection = (headerRegex: RegExp) => {
        const match = text.match(headerRegex);
        if (!match) return null;
        
        const startIndex = match.index! + match[0].length;
        // Find next section start
        const nextSectionRegex = /(?:^|\n)\s*(?:📰|📂|📝|✏️|🏷️|🔎|📄)/;
        // We need to look from startIndex
        const remainingText = text.slice(startIndex);
        const nextMatch = remainingText.match(nextSectionRegex);
        
        let content = '';
        if (nextMatch) {
          content = remainingText.slice(0, nextMatch.index);
        } else {
          content = remainingText;
        }
        return content.trim();
      };

      // 📰 Title
      const title = extractSection(/📰\s*Title[^\n]*/i);
      if (title) newDat.title = title;

      // 📂 Category
      const category = extractSection(/�\s*Category[^\n]*/i);
      if (category) {
        const cleanCategory = category.replace(/^:\s*/, '').trim();
        const matchedCategory = categories.find(c => c.name.toLowerCase() === cleanCategory.toLowerCase());
        if (matchedCategory) {
          newDat.category = matchedCategory._id;
          setPendingCategoryName('');
        } else {
          setPendingCategoryName(cleanCategory);
          newDat.category = '';
        }
      }

      // 📝 Description (Meta Description)
      const description = extractSection(/📝\s*Description[^\n]*/i);
      if (description) newDat.metaDescription = description;

      // ✏️ Excerpt
      const excerpt = extractSection(/✏️\s*Excerpt[^\n]*/i);
      if (excerpt) newDat.excerpt = excerpt;

      // 📰 Content (Specific Header)
      // Fallback to generic 📰 if specific header not found, but be careful not to match Title again
      let content = extractSection(/📰\s*Content[^\n]*/i);
      if (!content) {
         // Fallback: try 📄 or maybe second 📰?
         content = extractSection(/📄[^\n]*/i);
      }
      if (content) newDat.content = content;

      // 🏷️ Tags
      const tagsText = extractSection(/🏷️\s*(?:SEO)?\s*Tags[^\n]*/i);
      if (tagsText) {
        // Split by comma or newline
        const tagNames = tagsText.split(/,\s*|\n/).map(t => t.trim()).filter(t => t);
        const newTagIds: string[] = [];
        const newPendingTags: string[] = [];

        tagNames.forEach(tagName => {
           const existingTag = tags.find(t => t.name.toLowerCase() === tagName.toLowerCase());
           if (existingTag) {
             newTagIds.push(existingTag._id);
           } else {
             newPendingTags.push(tagName);
           }
        });
        
        newDat.tags = newTagIds;
        setPendingTags(newPendingTags);
      }

      // 🔎 SEO Meta (Optional)
      const seoSection = extractSection(/🔎\s*Optional\s*Meta[^\n]*/i);
      if (seoSection) {
        const metaTitleMatch = seoSection.match(/Meta\s*Title[^:]*:\s*([^\n]+)/i);
        if (metaTitleMatch) newDat.seoTitle = metaTitleMatch[1].trim();

        const metaDescMatch = seoSection.match(/Meta\s*Description[^:]*:\s*([^\n]+)/i);
        if (metaDescMatch) newDat.metaDescription = metaDescMatch[1].trim();
      }

      setFormData(prev => ({ ...prev, ...newDat }));
      return;
    }

    // Heuristic:
    // Line 1: Title
    // Line 2: Excerpt (if < 300 chars) or Content
    // Rest: Content
    
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);
    if (lines.length === 0) return;

    const newDat: any = {};
    
    // Try to parse as JSON first
    try {
      const json = JSON.parse(text);
      setFormData(prev => ({ ...prev, ...json }));
      return;
    } catch (e) {
      // Not JSON, continue with line heuristic
    }

    if (lines.length > 0) newDat.title = lines[0];
    if (lines.length > 1) {
       // If second line is short, maybe excerpt
       if (lines[1].length < 200) {
         newDat.excerpt = lines[1];
         newDat.content = lines.slice(2).join('\n\n');
       } else {
         newDat.content = lines.slice(1).join('\n\n');
       }
    }
    
    // Auto-detect category from content/title
    const lowerText = text.toLowerCase();
    const matchedCategory = categories.find(c => lowerText.includes(c.name.toLowerCase()));
    if (matchedCategory) {
      newDat.category = matchedCategory._id;
    }

    setFormData(prev => ({ ...prev, ...newDat }));
  }

  const handleTagToggle = (tagId: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter(id => id !== tagId)
        : [...prev.tags, tagId]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    try {
      let finalCategoryId = formData.category;
      // Resolve backend expected category as a string enum
      let finalCategoryName = ''
      if (finalCategoryId) {
        const catObj = categories.find(c => (c as any)._id === finalCategoryId)
        finalCategoryName = catObj?.name || ''
      }

      // Dynamic Category Creation
      if (!finalCategoryId && pendingCategoryName) {
         try {
           const newCat = await categoryService.createCategory({ 
             name: pendingCategoryName, 
             description: 'Auto-generated category',
             slug: pendingCategoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
           });
           finalCategoryId = newCat._id;
           setCategories(prev => [...prev, newCat]);
           finalCategoryName = newCat.name
         } catch (err) {
           console.error("Failed to create dynamic category", err);
         }
      }
      // Fallback category name if still empty
      if (!finalCategoryName) {
        // Try to match pending name against allowed enums
        if (pendingCategoryName) {
          const match = ALLOWED_CATEGORY_NAMES.find(n => n.toLowerCase() === pendingCategoryName.toLowerCase())
          finalCategoryName = match || 'Other'
        } else {
          finalCategoryName = 'Other'
        }
      }

      // Dynamic Tag Creation
      if (pendingTags.length > 0) {
         const createdTags = await Promise.all(pendingTags.map(async (tagName) => {
           try {
             return await tagService.createTag({ 
               name: tagName, 
               slug: tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
             });
           } catch (e) {
             console.error(`Failed to create tag ${tagName}`, e);
             return null;
           }
         }));
         
         const validNewTags = createdTags.filter(t => t !== null) as Tag[];
         // Update local tags state
         setTags(prev => [...prev, ...validNewTags]);
         
         // Add to form data tags
         validNewTags.forEach(t => {
           if (!formData.tags.includes(t._id)) {
             formData.tags.push(t._id);
           }
         });
      }

      let submitData: any;
      
      if (imageFile) {
        // Use FormData
        const form = new FormData();
        form.append('title', formData.title);
        // Ensure content present; fallback to excerpt or metaDescription
        const derivedContent = formData.content || formData.excerpt || formData.metaDescription || ''
        form.append('content', derivedContent);
        // Backend requires description; derive from excerpt/meta/content
        const derivedDescription = formData.excerpt || formData.metaDescription || (formData.content ? formData.content.slice(0, 160) : '');
        form.append('description', derivedDescription);
        form.append('excerpt', formData.excerpt);
        form.append('status', formData.status);
        form.append('category', finalCategoryName);
        
        // Tags need special handling usually, but let's append as array or multiple entries
        formData.tags.forEach(tag => form.append('tags', tag));

        form.append('image', imageFile); // Multer expects 'image'
        
        // Append other fields
        form.append('imageAlt', formData.imageAlt);
        form.append('metaTitle', formData.seoTitle);
        form.append('metaDescription', formData.metaDescription);
        form.append('focusKeyword', formData.focusKeyword);
        
        submitData = form;
      } else {
        // JSON
        const postData: any = {
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content || formData.excerpt || formData.metaDescription || '',
          featuredImage: formData.featuredImage,
          imageAlt: formData.imageAlt,
          status: formData.status,
          // Backend expects flat meta fields
          metaTitle: formData.seoTitle,
          metaDescription: formData.metaDescription,
          focusKeyword: formData.focusKeyword,
          settings: {
            allowComments: formData.allowComments,
            isPinned: formData.isPinned,
            isFeatured: false,
            adSenseEnabled: formData.adSenseEnabled,
            affiliateEnabled: formData.affiliateEnabled
          }
        }

        // Backend requires description; derive from excerpt/meta/content
        postData.description = formData.excerpt || formData.metaDescription || (formData.content ? formData.content.slice(0, 160) : '');

        postData.category = finalCategoryName
        if (formData.tags.length > 0) {
          postData.tags = formData.tags
        }
        submitData = postData;
      }

      // Create post using real API
      await postService.createPost(submitData)
      
      // Navigate to posts management page on success
      navigate('/admin/posts')
    } catch (error: any) {
      console.error('Create post error:', error)
      setErrors({ submit: error.message || 'Failed to create post. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveDraft = async () => {
    setFormData(prev => ({ ...prev, status: 'draft' }))
    // Wait for state update, then submit
    setTimeout(() => {
      handleSubmit(new Event('submit') as any)
    }, 0)
  }

  const handlePublish = async () => {
    setFormData(prev => ({ ...prev, status: 'published' }))
    // Wait for state update, then submit
    setTimeout(() => {
      handleSubmit(new Event('submit') as any)
    }, 0)
  }

  // Show loading spinner while fetching initial data
  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Create New Post - Admin</title>
        <meta name="description" content="Create a new blog post" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Post</h1>
            <p className="text-gray-600">Fill in the details below to create a new blog post.</p>
          </div>

          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{errors.submit}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Smart Fill / Data Distributer */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800">Data Distributer</CardTitle>
                <CardDescription className="text-blue-600">
                  Paste all details here to auto-populate fields. Works with JSON or plain text (Line 1: Title, Line 2+: Content).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  value={smartFillText}
                  onChange={(e) => handleSmartFill(e.target.value)}
                  placeholder="Paste article details here..."
                  rows={5}
                  className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the basic details of your post</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter post title"
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    placeholder="Brief description of the post"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder="Write your post content here..."
                    rows={12}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.content ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.content && (
                    <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Category and Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Category & Tags</CardTitle>
                <CardDescription>Organize your post with categories and tags</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.category ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {pendingCategoryName && !formData.category && (
                    <div className="mt-2 text-sm text-blue-600 bg-blue-50 p-2 rounded flex items-center">
                      <span className="mr-2">📂</span>
                      <span>Will create new category: <strong>{pendingCategoryName}</strong></span>
                    </div>
                  )}
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag._id}
                        variant={formData.tags.includes(tag._id) ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => handleTagToggle(tag._id)}
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                  {pendingTags.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 mb-1">New tags to be created:</p>
                      <div className="flex flex-wrap gap-2">
                        {pendingTags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary">
                            + {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
                <CardDescription>Add a featured image for your post (Upload compressed or URL)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Image (Auto-compressed)
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="cursor-pointer"
                  />
                  {imageFile && <p className="text-xs text-green-600 mt-1">Image selected and compressed: {imageFile.name}</p>}
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or use URL</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <Input
                    value={formData.featuredImage}
                    onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alt Text
                  </label>
                  <Input
                    value={formData.imageAlt}
                    onChange={(e) => handleInputChange('imageAlt', e.target.value)}
                    placeholder="Describe the image for accessibility"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/posts')}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleSaveDraft}
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner size="sm" /> : 'Save Draft'}
              </Button>
              <Button
                type="button"
                onClick={handlePublish}
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner size="sm" /> : 'Publish'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreatePostPage
