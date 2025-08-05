import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { postService } from '@/services/postService'
import { categoryService } from '@/services/categoryService'
import { tagService } from '@/services/tagService'
import type { Post, Category, Tag } from '@/types'

const CreatePostPage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
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

  // ... existing code ...

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    try {
      // Prepare post data
      const postData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        tags: formData.tags,
        featuredImage: formData.featuredImage,
        imageAlt: formData.imageAlt,
        status: formData.status,
        seo: {
          metaTitle: formData.seoTitle,
          metaDescription: formData.metaDescription,
          focusKeyword: formData.focusKeyword
        },
        settings: {
          allowComments: formData.allowComments,
          isPinned: formData.isPinned,
          adSenseEnabled: formData.adSenseEnabled,
          affiliateEnabled: formData.affiliateEnabled
        }
      }

      // Create post using real API
      await postService.createPost(postData)
      
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

  // ... rest of existing code ...