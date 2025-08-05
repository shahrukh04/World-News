import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { formatDate, generateExcerpt, readingTime } from '@/lib/utils'
import type { Post, Category } from '@/types'

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const [category, setCategory] = useState<Category | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setIsLoading(true)
        // Mock data - replace with actual API call
        const mockCategory: Category = {
          _id: '1',
          name: 'Web Development',
          slug: slug || 'web-development',
          description: 'Articles about modern web development, frameworks, and best practices.',
          color: '#3B82F6',
          icon: '💻',
          parentCategory: undefined,
          subcategories: ['react', 'vue', 'angular'],
          seo: {
            metaTitle: 'Web Development Articles - Blog Platform',
            metaDescription: 'Explore our collection of web development articles covering React, Vue, Angular, and modern development practices.',
            keywords: ['web development', 'react', 'vue', 'angular', 'javascript', 'typescript'],
            canonicalUrl: `/category/${slug}`
          },
          analytics: {
            totalPosts: 25,
            totalViews: 15000,
            avgEngagement: 12.5
          },
          displaySettings: {
            showInMenu: true,
            menuOrder: 1,
            featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop'
          },
          isActive: true,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        }

        const mockPosts: Post[] = [
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
            categories: [mockCategory],
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
            title: 'Vue.js 3 Composition API: A Complete Guide',
            slug: 'vue-js-3-composition-api-complete-guide',
            excerpt: 'Master the Vue.js 3 Composition API with this comprehensive guide. Learn how to build scalable and maintainable Vue applications.',
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
            categories: [mockCategory],
            tags: [],
            status: 'published',
            publishedAt: '2024-01-20T14:30:00Z',
            featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop',
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
        ]

        // Simulate API delay
        setTimeout(() => {
          setCategory(mockCategory)
          setPosts(mockPosts)
          setIsLoading(false)
        }, 1000)
      } catch (err) {
        setError('Failed to load category')
        setIsLoading(false)
      }
    }

    if (slug) {
      fetchCategoryData()
    }
  }, [slug])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-6">The category you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/">Go Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{category.seo.metaTitle || `${category.name} Articles - Blog Platform`}</title>
        <meta name="description" content={category.seo.metaDescription || category.description} />
        <meta name="keywords" content={category.seo.keywords.join(', ')} />
        <link rel="canonical" href={category.seo.canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={category.name} />
        <meta property="og:description" content={category.description} />
        <meta property="og:image" content={category.displaySettings.featuredImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={category.seo.canonicalUrl} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={category.name} />
        <meta name="twitter:description" content={category.description} />
        <meta name="twitter:image" content={category.displaySettings.featuredImage} />
      </Helmet>

      <div className="min-h-screen">
        {/* Category Header */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Breadcrumb */}
              <nav className="mb-6">
                <ol className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <li><Link to="/" className="hover:text-primary">Home</Link></li>
                  <li>/</li>
                  <li><Link to="/categories" className="hover:text-primary">Categories</Link></li>
                  <li>/</li>
                  <li className="text-foreground">{category.name}</li>
                </ol>
              </nav>

              <div className="flex items-center justify-center mb-6">
                <div className="text-4xl mr-4">{category.icon}</div>
                <h1 className="text-4xl md:text-5xl font-bold">{category.name}</h1>
              </div>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {category.description}
              </p>

              {/* Category Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{category.analytics.totalPosts}</div>
                  <div className="text-sm text-muted-foreground">Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{category.analytics.totalViews.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{category.analytics.avgEngagement}%</div>
                  <div className="text-sm text-muted-foreground">Engagement</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subcategories */}
        {category.subcategories.length > 0 && (
          <section className="py-8 border-b">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center gap-4">
                {category.subcategories.map((subcategory) => (
                  <Badge key={subcategory} variant="outline" className="text-sm">
                    <Link to={`/category/${subcategory}`}>
                      {subcategory}
                    </Link>
                  </Badge>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Articles */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">
                  Latest {category.name} Articles
                </h2>
                <span className="text-muted-foreground">
                  {posts.length} of {category.analytics.totalPosts} articles
                </span>
              </div>

              {posts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <Card key={post._id} className="hover:shadow-lg transition-shadow">
                      {post.featuredImage && (
                        <div className="aspect-video overflow-hidden rounded-t-lg">
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                          <span>{formatDate(post.publishedAt!)}</span>
                          <span>{readingTime(post.content)} min read</span>
                        </div>
                        <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                          <Link to={`/post/${post.slug}`}>
                            {post.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="line-clamp-3">
                          {post.excerpt || generateExcerpt(post.content)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium">
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
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold mb-2">No articles yet</h3>
                  <p className="text-muted-foreground mb-6">
                    We're working on creating great content for this category. Check back soon!
                  </p>
                  <Button asChild>
                    <Link to="/posts">Browse All Articles</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Related Categories */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Explore Other Categories</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {['SEO', 'Digital Marketing', 'Technology'].map((catName) => (
                  <Card key={catName} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl">{catName}</CardTitle>
                      <CardDescription>
                        Discover articles about {catName.toLowerCase()} and related topics.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/category/${catName.toLowerCase().replace(' ', '-')}`}>
                          Explore {catName}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default CategoryPage