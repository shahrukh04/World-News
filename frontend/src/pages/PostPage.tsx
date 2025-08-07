import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '@/components/ui/Badge'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { formatDate, generateExcerpt, readingTime } from '@/lib/utils'
import type { Post, Category, Tag } from '@/types'
import AdSenseAd from '../AdSenseAd'

// Move the long HTML string to a separate variable OUTSIDE the component
const mockContent = `
  <h2>Introduction to React and TypeScript</h2>
  <p>React and TypeScript are two powerful technologies that, when combined, create a robust foundation for building modern web applications. TypeScript adds static typing to JavaScript, making your code more reliable and easier to maintain.</p>
  <h3>Why Use TypeScript with React?</h3>
  <p>TypeScript provides several benefits when working with React:</p>
  <ul>
    <li><strong>Better IDE Support:</strong> Enhanced autocomplete and error detection</li>
    <li><strong>Type Safety:</strong> Catch errors at compile time rather than runtime</li>
    <li><strong>Better Documentation:</strong> Types serve as inline documentation</li>
    <li><strong>Refactoring Confidence:</strong> Safe refactoring with type checking</li>
  </ul>
  <h2>Setting Up Your Development Environment</h2>
  <p>Before we dive into coding, let's set up your development environment properly.</p>
  <h3>Prerequisites</h3>
  <p>Make sure you have the following installed:</p>
  <ul>
    <li>Node.js (version 16 or higher)</li>
    <li>npm or yarn package manager</li>
    <li>A code editor (VS Code recommended)</li>
  </ul>
  <h3>Creating a New React TypeScript Project</h3>
  <p>You can create a new React TypeScript project using Create React App:</p>
  <pre><code>npx create-react-app my-app --template typescript</code></pre>
  <h2>Understanding TypeScript in React</h2>
  <p>Let's explore how TypeScript enhances React development with practical examples.</p>
  <h3>Component Props with TypeScript</h3>
  <p>TypeScript allows you to define the shape of your component props:</p>
  <pre><code>interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button onClick={props.onClick} disabled={props.disabled} className={"btn btn-" + (props.variant || 'primary')}>{props.text}</button>
  );
};</code></pre>
  <h2>State Management with TypeScript</h2>
  <p>TypeScript makes state management more predictable and type-safe.</p>
  <h3>useState with TypeScript</h3>
  <p>You can specify the type of your state:</p>
  <pre><code>interface User {
  id: number;
  name: string;
  email: string;
}

const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState<boolean>(false);</code></pre>
  <h2>Advanced Patterns</h2>
  <p>As your application grows, you'll encounter more complex patterns.</p>
  <h3>Generic Components</h3>
  <p>TypeScript allows you to create generic components that work with different data types:</p>
  <pre><code>interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}</code></pre>
  <h2>Best Practices</h2>
  <p>Here are some best practices for using TypeScript with React:</p>
  <ul>
    <li>Always define interfaces for your props</li>
    <li>Use strict TypeScript configuration</li>
    <li>Leverage utility types like Partial, Pick, and Omit</li>
    <li>Keep your types close to where they're used</li>
    <li>Use type guards for runtime type checking</li>
  </ul>
  <h2>Conclusion</h2>
  <p>TypeScript and React are a powerful combination that can significantly improve your development experience and code quality. By following the patterns and best practices outlined in this guide, you'll be well on your way to building robust, maintainable React applications.</p>
`;

const PostPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true)
        // Mock data for now - replace with actual API call
        const mockPost: Post = {
          _id: '1',
          title: 'Getting Started with React and TypeScript: A Comprehensive Guide',
          slug: slug || 'getting-started-react-typescript',
          excerpt: 'Learn how to build modern web applications with React and TypeScript. This comprehensive guide covers everything you need to know from setup to deployment.',
          content: mockContent,
          author: {
            _id: '1',
            username: 'john_doe',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            role: 'admin',

            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
          },
          category: {
            _id: '1',
            name: 'Web Development',
            slug: 'web-development',
            description: 'Articles about modern web development',
            displaySettings: {
              color: '#3B82F6',
              icon: '💻'
            },
            seo: {
              metaTitle: 'Web Development Articles',
              metaDescription: 'Latest web development tutorials and guides'
            },
            analytics: {
              totalPosts: 25,
              totalViews: 15000,
              averageReadTime: 8
            },
            isActive: true,
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
          },
          tags: [],
          status: 'published',
          publishedAt: '2024-01-15T10:00:00Z',
          featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
          seo: {
            metaTitle: 'Getting Started with React and TypeScript: A Comprehensive Guide',
            metaDescription: 'Learn how to build modern web applications with React and TypeScript. This comprehensive guide covers everything you need to know from setup to deployment.',
            canonicalUrl: `/post/${slug}`,
            focusKeyword: 'React TypeScript',
          },
          analytics: {
            views: 1250,
            likes: 156,
            shares: 120,
            comments: 23,
            readTime: 6,
          },
          settings: {
            allowComments: true,
            isPinned: false,
            isFeatured: false,
            adSenseEnabled: true,
            affiliateEnabled: false,
          },
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z',
        }

        const mockRelatedPosts: Post[] = [
          {
            _id: '2',
            title: 'Advanced TypeScript Patterns for React Developers',
            slug: 'advanced-typescript-patterns-react',
            excerpt: 'Explore advanced TypeScript patterns that will make your React code more robust and maintainable.',
            content: 'Lorem ipsum dolor sit amet...',
            author: mockPost.author,
            category: {
              _id: '2',
              name: 'TypeScript',
              slug: 'typescript',
              description: 'TypeScript tutorials and best practices',
              displaySettings: {
                color: '#007ACC',
                icon: '📘'
              },
              seo: {
                metaTitle: 'TypeScript Articles',
                metaDescription: 'Learn TypeScript with our comprehensive guides'
              },
              analytics: {
                totalPosts: 18,
                totalViews: 12000,
                averageReadTime: 7
              },
              isActive: true,
              createdAt: '2024-01-01T00:00:00Z',
              updatedAt: '2024-01-01T00:00:00Z'
            },
            tags: [],
            status: 'published',
            publishedAt: '2024-01-20T14:30:00Z',
            featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
            seo: { metaTitle: '', metaDescription: '', canonicalUrl: '', focusKeyword: '' },
            analytics: { views: 0, likes: 0, shares: 0, comments: 0, readTime: 0 },
            settings: { allowComments: true, isPinned: false, isFeatured: false, adSenseEnabled: true, affiliateEnabled: false },
            createdAt: '2024-01-20T14:30:00Z',
            updatedAt: '2024-01-20T14:30:00Z',
          },
          {
            _id: '3',
            title: 'Building Scalable React Applications with TypeScript',
            slug: 'building-scalable-react-applications-typescript',
            excerpt: 'Learn how to structure and scale your React applications using TypeScript best practices.',
            content: 'Lorem ipsum dolor sit amet...',
            author: mockPost.author,
            category: {
              _id: '3',
              name: 'React',
              slug: 'react',
              description: 'React development guides and tutorials',
              displaySettings: {
                color: '#61DAFB',
                icon: '⚛️'
              },
              seo: {
                metaTitle: 'React Articles',
                metaDescription: 'Master React with our detailed tutorials'
              },
              analytics: {
                totalPosts: 32,
                totalViews: 20000,
                averageReadTime: 9
              },
              isActive: true,
              createdAt: '2024-01-01T00:00:00Z',
              updatedAt: '2024-01-01T00:00:00Z'
            },
            tags: [],
            status: 'published',
            publishedAt: '2024-01-25T09:15:00Z',
            featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop',
            seo: { metaTitle: '', metaDescription: '', canonicalUrl: '', focusKeyword: '' },
            analytics: { views: 0, likes: 0, shares: 0, comments: 0, readTime: 0 },
            settings: { allowComments: true, isPinned: false, isFeatured: false, adSenseEnabled: true, affiliateEnabled: false },
            createdAt: '2024-01-25T09:15:00Z',
            updatedAt: '2024-01-25T09:15:00Z',
          },
        ]

        // Simulate API delay
        setTimeout(() => {
          setPost(mockPost)
          setRelatedPosts(mockRelatedPosts)
          setIsLoading(false)
        }, 1000)
      } catch (err) {
        setError('Failed to load post')
        setIsLoading(false)
      }
    }

    if (slug) {
      fetchPost()
    }
  }, [slug])

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = post?.title || ''
    const text = post?.excerpt || ''

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`,
    }

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">The post you're looking for doesn't exist.</p>
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
        <title>{post.seo.metaTitle || post.title}</title>
        <meta name="description" content={post.seo.metaDescription || post.excerpt} />
        {post.seo.focusKeyword && <meta name="keywords" content={post.seo.focusKeyword} />}
        <link rel="canonical" href={post.seo.canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.featuredImage} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.featuredImage} />
        
        {/* Article structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.featuredImage,
            "author": {
              "@type": "Person",
              "name": `${post.author.firstName} ${post.author.lastName}`
            },
            "publisher": {
              "@type": "Organization",
              "name": "Blog Platform",
              "logo": {
                "@type": "ImageObject",
                "url": "/logo.png"
              }
            },
            "datePublished": post.publishedAt,
            "dateModified": post.updatedAt,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": window.location.href
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Google AdSense - Top of Content */}
        {post.settings.adSenseEnabled && (
          <div className="container mx-auto px-4 py-4">
            <AdSenseAd adSlot={import.meta.env.VITE_ADSENSE_SLOT_HORIZONTAL} adFormat="auto" className="w-full" />
          </div>
        )}

        <article className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary">Home</Link></li>
              <li>/</li>
              <li><Link to="/posts" className="hover:text-primary">Posts</Link></li>
              <li>/</li>
              <li className="text-foreground">{post.title}</li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {post.author.firstName.charAt(0)}
                    </span>
                  </div>
                  <span>
                    By {post.author.firstName} {post.author.lastName}
                  </span>
                </div>
                <span>•</span>
                <span>{formatDate(post.publishedAt!)}</span>
                <span>•</span>
                <span>{post.analytics.readTime} min read</span>
                <span>•</span>
                <span>{post.analytics.views.toLocaleString()} views</span>
              </div>

              {/* Social Share Buttons */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-sm font-medium">Share:</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('twitter')}
                  className="flex items-center space-x-2"
                >
                  <span>Twitter</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('facebook')}
                  className="flex items-center space-x-2"
                >
                  <span>Facebook</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('linkedin')}
                  className="flex items-center space-x-2"
                >
                  <span>LinkedIn</span>
                </Button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="max-w-4xl mx-auto mb-8">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Google AdSense - Middle of Content */}
            {post.settings.adSenseEnabled && (
              <div className="my-8">
                <AdSenseAd 
              adSlot={import.meta.env.VITE_ADSENSE_SLOT_IN_ARTICLE} 
              adFormat="fluid" 
              adLayout="in-article" 
              style={{ textAlign: 'center' }}
              className="w-full" 
            />
              </div>
            )}

            {/* Article Footer */}
            <footer className="mt-12 pt-8 border-t">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">Tags:</span>
                  {post.tags.map((tag) => (
                    <Badge key={tag._id} variant="secondary">
                      <Link to={`/tag/${tag.slug}`}>{tag.name}</Link>
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('pinterest')}
                  >
                    Pin it
                  </Button>
                </div>
              </div>
            </footer>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-secondary/20 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Related Articles</h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <Card key={relatedPost._id} className="hover:shadow-lg transition-shadow">
                      {relatedPost.featuredImage && (
                        <div className="aspect-video overflow-hidden rounded-t-lg">
                          <img
                            src={relatedPost.featuredImage}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                          <span>{formatDate(relatedPost.publishedAt!)}</span>
                          <span>{relatedPost.analytics.readTime} min read</span>
                        </div>
                        <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                          <Link to={`/post/${relatedPost.slug}`}>
                            {relatedPost.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="line-clamp-3">
                          {relatedPost.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/post/${relatedPost.slug}`}>Read More</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Google AdSense - Bottom of Content */}
        {post.settings.adSenseEnabled && (
          <div className="container mx-auto px-4 py-4">
            <AdSenseAd 
              adSlot={import.meta.env.VITE_ADSENSE_SLOT_FLUID} 
              adFormat="fluid" 
              adLayoutKey="-fb+5w+4e-db+86"
              className="w-full" 
            />
          </div>
        )}
      </div>
    </>
  )
}

export default PostPage