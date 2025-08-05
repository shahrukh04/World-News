// Base types for the application

export interface User {
  _id: string
  username: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  role: 'admin' | 'editor' | 'author' | 'subscriber'
  profile?: {
    bio?: string
    socialLinks?: {
      twitter?: string
      linkedin?: string
      github?: string
      website?: string
    }
  }
  createdAt: string
  updatedAt: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  description: string
  parentCategory?: string
  subcategories?: string[]
  displaySettings: {
    color: string
    icon?: string
    featuredImage?: string
  }
  seo: {
    metaTitle?: string
    metaDescription?: string
    focusKeyword?: string
  }
  analytics: {
    totalPosts: number
    totalViews: number
    averageReadTime: number
  }
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Tag {
  _id: string
  name: string
  slug: string
  description?: string
  color?: string
  analytics: {
    totalPosts: number
    totalViews: number
    postCount: number
    clickCount: number
  }
  relatedTags: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Post {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: User
  category: Category
  tags: Tag[]
  featuredImage?: string
  imageAlt?: string
  status: 'draft' | 'published' | 'archived'
  publishedAt?: string
  seo: {
    metaTitle?: string
    metaDescription?: string
    focusKeyword?: string
    canonicalUrl?: string
  }
  analytics: {
    views: number
    likes: number
    shares: number
    comments: number
    readTime: number
  }
  settings: {
    allowComments: boolean
    isPinned: boolean
    isFeatured: boolean
    adSenseEnabled: boolean
    affiliateEnabled: boolean
  }
  createdAt: string
  updatedAt: string
}

export interface Comment {
  _id: string
  post: string
  author: {
    name: string
    email: string
    avatar?: string
  }
  content: string
  parentComment?: string
  replies?: Comment[]
  status: 'pending' | 'approved' | 'spam' | 'rejected'
  createdAt: string
  updatedAt: string
}

export interface NewsItem {
  _id: string
  title: string
  description: string
  url: string
  urlToImage?: string
  publishedAt: string
  source: {
    id?: string
    name: string
  }
  category: string
  country?: string
  language?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface PaginationMeta {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface PaginatedResponse<T> {
  items: T[]
  pagination: PaginationMeta
}

// Form types
export interface LoginForm {
  email: string
  password: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterForm {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: User
  refreshToken?: string | null
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

// Search and Filter types
export interface SearchFilters {
  query?: string
  category?: string
  tags?: string[]
  author?: string
  dateFrom?: string
  dateTo?: string
  sortBy?: 'date' | 'views' | 'likes' | 'relevance'
  sortOrder?: 'asc' | 'desc'
}

export interface SearchResults {
  posts: Post[]
  totalResults: number
  total: number
  pagination: PaginationMeta
  filters: SearchFilters
}

// Theme types
export interface ThemeConfig {
  mode: 'light' | 'dark' | 'system'
  primaryColor: string
  fontFamily: string
  fontSize: 'small' | 'medium' | 'large'
}

// Analytics types
export interface AnalyticsData {
  pageViews: number
  uniqueVisitors: number
  bounceRate: number
  averageSessionDuration: number
  topPages: Array<{
    path: string
    views: number
    title: string
  }>
  topReferrers: Array<{
    source: string
    visits: number
  }>
  deviceStats: {
    desktop: number
    mobile: number
    tablet: number
  }
}

// Error types
export interface AppError {
  code: string
  message: string
  details?: any
  timestamp: string
}