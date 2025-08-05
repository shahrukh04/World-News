import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { formatDate, generateExcerpt, readingTime } from '@/lib/utils'
import type { Post, SearchParams, SearchResults } from '@/types'

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [results, setResults] = useState<SearchResults | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    tags: searchParams.get('tags')?.split(',') || [],
    author: searchParams.get('author') || '',
    sortBy: searchParams.get('sortBy') || 'relevance'
  })

  const handleSearch = async (searchQuery: string = query) => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    try {
      // Mock search results - replace with actual API call
      const mockResults: SearchResults = {
        posts: [
          {
            _id: '1',
            title: 'Getting Started with React and TypeScript',
            slug: 'getting-started-react-typescript',
            excerpt: 'Learn how to build modern web applications with React and TypeScript. This comprehensive guide covers everything you need to know.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
            author: {
              _id: '1',
              username: 'john_doe',
              firstName: 'John',
              lastName: 'Doe',
              email: 'john@example.com',
              role: 'admin',
              isActive: true,
              emailVerified: true,
              newsletterSubscribed: true,
              preferences: { theme: 'light', emailNotifications: true, marketingEmails: true },
              analytics: { totalPosts: 10, totalViews: 5000, totalShares: 250, avgEngagement: 15.5 },
              createdAt: '2024-01-01T00:00:00Z',
              updatedAt: '2024-01-01T00:00:00Z',
            },
            categories: [],
            tags: [],
            status: 'published',
            publishedAt: '2024-01-15T10:00:00Z',
            featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
            seo: { metaTitle: '', metaDescription: '', keywords: [], canonicalUrl: '', focusKeyword: '', seoScore: 0 },
            monetization: { affiliateLinks: [], adSenseEnabled: true, adPlacements: [], sponsoredContent: false },
            analytics: { views: 0, uniqueViews: 0, shares: { facebook: 0, twitter: 0, linkedin: 0, pinterest: 0, total: 0 }, comments: 0, likes: 0, timeOnPage: 0, bounceRate: 0, engagementScore: 0 },
            performance: { loadTime: 0, coreWebVitals: { lcp: 0, fid: 0, cls: 0 } },
            social: { autoShare: false, platforms: [], customMessages: {} },
            contentAnalysis: { wordCount: 0, readingTime: 0, readabilityScore: 0, keywordDensity: {}, internalLinks: 0, externalLinks: 0, images: 0 },
            isPasswordProtected: false,
            allowComments: true,
            isPinned: false,
            createdAt: '2024-01-15T10:00:00Z',
            updatedAt: '2024-01-15T10:00:00Z',
          },
          {
            _id: '2',
            title: 'Advanced SEO Techniques for Modern Websites',
            slug: 'advanced-seo-techniques-modern-websites',
            excerpt: 'Discover advanced SEO strategies that will help your website rank higher in search results and drive more organic traffic.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
            author: {
              _id: '1',
              username: 'john_doe',
              firstName: 'John',
              lastName: 'Doe',
              email: 'john@example.com',
              role: 'admin',
              isActive: true,
              emailVerified: true,
              newsletterSubscribed: true,
              preferences: { theme: 'light', emailNotifications: true, marketingEmails: true },
              analytics: { totalPosts: 10, totalViews: 5000, totalShares: 250, avgEngagement: 15.5 },
              createdAt: '2024-01-01T00:00:00Z',
              updatedAt: '2024-01-01T00:00:00Z',
            },
            categories: [],
            tags: [],
            status: 'published',
            publishedAt: '2024-01-20T14:30:00Z',
            featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
            seo: { metaTitle: '', metaDescription: '', keywords: [], canonicalUrl: '', focusKeyword: '', seoScore: 0 },
            monetization: { affiliateLinks: [], adSenseEnabled: true, adPlacements: [], sponsoredContent: false },
            analytics: { views: 0, uniqueViews: 0, shares: { facebook: 0, twitter: 0, linkedin: 0, pinterest: 0, total: 0 }, comments: 0, likes: 0, timeOnPage: 0, bounceRate: 0, engagementScore: 0 },
            performance: { loadTime: 0, coreWebVitals: { lcp: 0, fid: 0, cls: 0 } },
            social: { autoShare: false, platforms: [], customMessages: {} },
            contentAnalysis: { wordCount: 0, readingTime: 0, readabilityScore: 0, keywordDensity: {}, internalLinks: 0, externalLinks: 0, images: 0 },
            isPasswordProtected: false,
            allowComments: true,
            isPinned: false,
            createdAt: '2024-01-20T14:30:00Z',
            updatedAt: '2024-01-20T14:30:00Z',
          }
        ],
        categories: [],
        tags: [],
        users: [],
        total: 2
      }

      // Simulate API delay
      setTimeout(() => {
        setResults(mockResults)
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Search error:', error)
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      const newSearchParams = new URLSearchParams()
      newSearchParams.set('q', query)
      if (filters.category) newSearchParams.set('category', filters.category)
      if (filters.tags.length > 0) newSearchParams.set('tags', filters.tags.join(','))
      if (filters.author) newSearchParams.set('author', filters.author)
      if (filters.sortBy) newSearchParams.set('sortBy', filters.sortBy)
      
      setSearchParams(newSearchParams)
      handleSearch(query)
    }
  }

  const handleFilterChange = (key: string, value: string | string[]) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    
    const newSearchParams = new URLSearchParams()
    newSearchParams.set('q', query)
    if (newFilters.category) newSearchParams.set('category', newFilters.category)
    if (newFilters.tags.length > 0) newSearchParams.set('tags', newFilters.tags.join(','))
    if (newFilters.author) newSearchParams.set('author', newFilters.author)
    if (newFilters.sortBy) newSearchParams.set('sortBy', newFilters.sortBy)
    
    setSearchParams(newSearchParams)
    handleSearch()
  }

  useEffect(() => {
    if (query) {
      handleSearch()
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>Search - Blog Platform | Find Articles, Topics & More</title>
        <meta 
          name="description" 
          content="Search our extensive collection of articles on web development, SEO, digital marketing, and technology. Find exactly what you're looking for." 
        />
        <meta name="keywords" content="search, articles, blog posts, web development, seo, digital marketing" />
        <link rel="canonical" href="/search" />
      </Helmet>

      <div className="min-h-screen">
        {/* Search Header */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold mb-6 text-center">Search Articles</h1>
              
              {/* Search Form */}
              <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Search for articles, topics, or keywords..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  <Button type="submit" size="lg" disabled={isLoading}>
                    {isLoading ? <LoadingSpinner size="sm" /> : 'Search'}
                  </Button>
                </div>
              </form>

              {/* Active Filters */}
              {(filters.category || filters.tags.length > 0 || filters.author || filters.sortBy !== 'relevance') && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="text-sm text-muted-foreground">Filters:</span>
                  {filters.category && (
                    <Badge variant="secondary" className="cursor-pointer" onClick={() => handleFilterChange('category', '')}>
                      Category: {filters.category} ×
                    </Badge>
                  )}
                  {filters.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => handleFilterChange('tags', filters.tags.filter((_, i) => i !== index))}>
                      Tag: {tag} ×
                    </Badge>
                  ))}
                  {filters.author && (
                    <Badge variant="secondary" className="cursor-pointer" onClick={() => handleFilterChange('author', '')}>
                      Author: {filters.author} ×
                    </Badge>
                  )}
                  {filters.sortBy !== 'relevance' && (
                    <Badge variant="secondary" className="cursor-pointer" onClick={() => handleFilterChange('sortBy', 'relevance')}>
                      Sort: {filters.sortBy} ×
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Filters and Results */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Filters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <select
                        value={filters.category}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      >
                        <option value="">All Categories</option>
                        <option value="web-development">Web Development</option>
                        <option value="seo">SEO</option>
                        <option value="digital-marketing">Digital Marketing</option>
                        <option value="technology">Technology</option>
                      </select>
                    </div>

                    {/* Tags Filter */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Tags</label>
                      <div className="space-y-2">
                        {['react', 'typescript', 'seo', 'marketing', 'javascript'].map((tag) => (
                          <label key={tag} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={filters.tags.includes(tag)}
                              onChange={(e) => {
                                const newTags = e.target.checked
                                  ? [...filters.tags, tag]
                                  : filters.tags.filter(t => t !== tag)
                                handleFilterChange('tags', newTags)
                              }}
                              className="rounded"
                            />
                            <span className="text-sm capitalize">{tag}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Author Filter */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Author</label>
                      <select
                        value={filters.author}
                        onChange={(e) => handleFilterChange('author', e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      >
                        <option value="">All Authors</option>
                        <option value="john-doe">John Doe</option>
                        <option value="jane-smith">Jane Smith</option>
                        <option value="mike-johnson">Mike Johnson</option>
                      </select>
                    </div>

                    {/* Sort By */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Sort By</label>
                      <select
                        value={filters.sortBy}
                        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      >
                        <option value="relevance">Relevance</option>
                        <option value="date">Date</option>
                        <option value="views">Views</option>
                        <option value="engagement">Engagement</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Search Results */}
              <div className="lg:col-span-3">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <LoadingSpinner size="lg" />
                  </div>
                ) : results ? (
                  <div>
                    {/* Results Header */}
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">
                        Search Results
                        {query && (
                          <span className="text-muted-foreground font-normal">
                            {' '}for "{query}"
                          </span>
                        )}
                      </h2>
                      <span className="text-muted-foreground">
                        {results.total} result{results.total !== 1 ? 's' : ''}
                      </span>
                    </div>

                    {/* Results */}
                    {results.posts.length > 0 ? (
                      <div className="space-y-6">
                        {results.posts.map((post) => (
                          <Card key={post._id} className="hover:shadow-lg transition-shadow">
                            <div className="flex flex-col md:flex-row">
                              {post.featuredImage && (
                                <div className="md:w-48 md:h-32 overflow-hidden rounded-l-lg">
                                  <img
                                    src={post.featuredImage}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1 p-6">
                                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                                  <span>{formatDate(post.publishedAt!)}</span>
                                  <span>{readingTime(post.content)} min read</span>
                                </div>
                                <CardTitle className="mb-2 hover:text-primary transition-colors">
                                  <Link to={`/post/${post.slug}`}>
                                    {post.title}
                                  </Link>
                                </CardTitle>
                                <CardDescription className="mb-4 line-clamp-2">
                                  {post.excerpt || generateExcerpt(post.content)}
                                </CardDescription>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                                      <span className="text-xs font-medium">
                                        {post.author.firstName.charAt(0)}
                                      </span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                      {post.author.firstName} {post.author.lastName}
                                    </span>
                                  </div>
                                  <Button variant="ghost" size="sm" asChild>
                                    <Link to={`/post/${post.slug}`}>Read More</Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold mb-2">No results found</h3>
                        <p className="text-muted-foreground mb-6">
                          Try adjusting your search terms or filters to find what you're looking for.
                        </p>
                        <Button onClick={() => setQuery('')}>
                          Clear Search
                        </Button>
                      </div>
                    )}
                  </div>
                ) : query ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold mb-2">Start your search</h3>
                    <p className="text-muted-foreground">
                      Enter keywords above to find relevant articles and content.
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default SearchPage