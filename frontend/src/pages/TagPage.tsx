import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'                       
import { Badge } from '@/components/ui/Badge'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { formatDate, generateExcerpt, readingTime } from '@/lib/utils'
import type { Post, Tag, Category } from '@/types'

const TagPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const [tag, setTag] = useState<Tag | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTagData = async () => {
      try {
        setIsLoading(true)
        // Mock data - replace with actual API call
        const mockTag: Tag = {
          _id: '1',
          name: 'React',
          slug: slug || 'react',
          description: 'Articles about React.js, React hooks, and modern React development practices.',
          color: '#61DAFB',
          analytics: {
            totalPosts: 15,
            totalViews: 8500,
            postCount: 15,
            clickCount: 1200
          },
          relatedTags: ['typescript', 'javascript', 'frontend'],
          isActive: true,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        }

        const mockCategory: Category = {
          _id: '1',
          name: 'React',
          slug: slug || 'react',
          description: 'Articles about React.js, React hooks, and modern React development practices.',
          displaySettings: {
            color: '#61DAFB',
            icon: 'react'
          },
          seo: {
            metaTitle: 'React Articles',
            metaDescription: 'Learn React development',
            focusKeyword: 'react'
          },
          analytics: {
            totalPosts: 15,
            totalViews: 8500,
            averageReadTime: 5
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
              role: 'admin' as const,
              createdAt: '2024-01-01T00:00:00Z',
              updatedAt: '2024-01-01T00:00:00Z',
            },
            category: mockCategory,
            tags: [mockTag],
            status: 'published',
            publishedAt: '2024-01-15T10:00:00Z',
            featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
            seo: {
              metaTitle: 'React Hooks Guide',
              metaDescription: 'Learn React Hooks with practical examples',
              focusKeyword: 'react hooks',
              canonicalUrl: '/post/react-hooks-guide'
            },
            analytics: {
              views: 1250,
              likes: 45,
              shares: 12,
              comments: 8,
              readTime: 5
            },
            settings: {
               allowComments: true,
               isPinned: false,
               isFeatured: false,
               adSenseEnabled: true,
               affiliateEnabled: false
             },
             createdAt: '2024-01-15T10:00:00Z',
            updatedAt: '2024-01-15T10:00:00Z',
          },
          {
            _id: '2',
            title: 'React Hooks: A Complete Guide',
            slug: 'react-hooks-complete-guide',
            excerpt: 'Master React Hooks with this comprehensive guide. Learn useState, useEffect, useContext, and custom hooks.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
            author: {
              _id: '1',
              username: 'john_doe',
              firstName: 'John',
              lastName: 'Doe',
              email: 'john@example.com',
              role: 'admin' as const,
              createdAt: '2024-01-01T00:00:00Z',
              updatedAt: '2024-01-01T00:00:00Z',
            },
            category: mockCategory,
            tags: [mockTag],
            status: 'published',
            publishedAt: '2024-01-20T14:30:00Z',
            featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop',
            seo: {
              metaTitle: 'Advanced React Patterns',
              metaDescription: 'Master advanced React patterns and techniques',
              focusKeyword: 'react patterns',
              canonicalUrl: '/post/advanced-react-patterns'
            },
            analytics: {
              views: 890,
              likes: 32,
              shares: 8,
              comments: 5,
              readTime: 7
            },
            settings: {
               allowComments: true,
               isPinned: false,
               isFeatured: true,
               adSenseEnabled: true,
               affiliateEnabled: false
             },
             createdAt: '2024-01-20T14:30:00Z',
            updatedAt: '2024-01-20T14:30:00Z',
          }
        ]

        // Simulate API delay
        setTimeout(() => {
          setTag(mockTag)
          setPosts(mockPosts)
          setIsLoading(false)
        }, 1000)
      } catch (err) {
        setError('Failed to load tag')
        setIsLoading(false)
      }
    }

    if (slug) {
      fetchTagData()
    }
  }, [slug])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error || !tag) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tag Not Found</h1>
          <p className="text-muted-foreground mb-6">The tag you're looking for doesn't exist.</p>
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
        <title>{tag.name} Articles - Blog Platform | {tag.name} Tutorials & Guides</title>
        <meta 
          name="description" 
          content={`Explore our collection of ${tag.name} articles, tutorials, and guides. Learn ${tag.name} development with practical examples and best practices.`} 
        />
        <meta name="keywords" content={`${tag.name}, ${tag.name.toLowerCase()}, tutorials, guides, development`} />
        <link rel="canonical" href={`/tag/${tag.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${tag.name} Articles - Blog Platform`} />
        <meta property="og:description" content={`Explore our collection of ${tag.name} articles, tutorials, and guides.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`/tag/${tag.slug}`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${tag.name} Articles - Blog Platform`} />
        <meta name="twitter:description" content={`Explore our collection of ${tag.name} articles, tutorials, and guides.`} />
      </Helmet>

      <div className="min-h-screen">
        {/* Tag Header */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Breadcrumb */}
              <nav className="mb-6">
                <ol className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <li><Link to="/" className="hover:text-primary">Home</Link></li>
                  <li>/</li>
                  <li><Link to="/tags" className="hover:text-primary">Tags</Link></li>
                  <li>/</li>
                  <li className="text-foreground">{tag.name}</li>
                </ol>
              </nav>

              <div className="mb-6">
                <Badge 
                  className="text-lg px-6 py-3 mb-4"
                  style={{ backgroundColor: tag.color, color: 'white' }}
                >
                  #{tag.name}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {tag.name} Articles
                </h1>
              </div>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {tag.description}
              </p>

              {/* Tag Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{tag.analytics.postCount}</div>
                  <div className="text-sm text-muted-foreground">Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{tag.analytics.totalViews.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{tag.analytics.clickCount}</div>
                  <div className="text-sm text-muted-foreground">Clicks</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Tags */}
        {tag.relatedTags.length > 0 && (
          <section className="py-8 border-b">
            <div className="container mx-auto px-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">Related Tags</h3>
                <p className="text-muted-foreground">Explore similar topics</p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {tag.relatedTags.map((relatedTag) => (
                  <Badge key={relatedTag} variant="outline" className="text-sm">
                    <Link to={`/tag/${relatedTag}`}>
                      #{relatedTag}
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
                  Latest {tag.name} Articles
                </h2>
                <span className="text-muted-foreground">
                  {posts.length} of {tag.analytics.postCount} articles
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
                  <div className="text-6xl mb-4">🏷️</div>
                  <h3 className="text-xl font-semibold mb-2">No articles yet</h3>
                  <p className="text-muted-foreground mb-6">
                    We're working on creating great content for this tag. Check back soon!
                  </p>
                  <Button asChild>
                    <Link to="/posts">Browse All Articles</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Popular Tags */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Popular Tags</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {['JavaScript', 'TypeScript', 'Vue.js', 'Angular', 'Node.js', 'CSS'].map((tagName) => (
                  <Badge 
                    key={tagName} 
                    variant="outline" 
                    className="text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Link to={`/tag/${tagName.toLowerCase().replace('.', '')}`}>
                      #{tagName}
                    </Link>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default TagPage