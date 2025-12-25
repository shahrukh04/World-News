import api from '../api/api';

export interface IUserLogin {
  username: string;
  password: string;
}

export interface IUserRegister extends IUserLogin {}

export interface INewsCreate {
  title: string;
  category: string;
  description: string;
  content: string;
  image?: File;
  
  // SEO Fields
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  
  // Content
  focusKeyword?: string;
  tags?: string[];
  excerpt?: string;
  status?: 'draft' | 'published' | 'archived';
  featured?: boolean;
  trending?: boolean;
}

export interface INews {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  content?: string;
  contentChunks?: string[];
  image?: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  
  // SEO Fields
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  
  // Content SEO
  readingTime?: number;
  wordCount?: number;
  seoScore?: number;
  
  // Publishing
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  featured: boolean;
  trending: boolean;
  
  // Analytics
  views: number;
  shares: number;
  likes: number;
  
  // Additional
  focusKeyword?: string;
  relatedArticles?: string[];
  tags?: string[];
  excerpt?: string;
}

export const loginUser = async (data: IUserLogin) => {
  const response = await api.post('/users/login', data);
  return response.data;
};

export const registerUser = async (data: IUserRegister) => {
  const response = await api.post('/users/register', data);
  return response.data;
};

export interface IPaginatedNews {
  news: INews[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const fetchNews = async (
  category?: string, 
  status?: string, 
  page: number = 1, 
  limit: number = 10
): Promise<IPaginatedNews> => {
  let url = '/news';
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (status) params.append('status', status);
  params.append('page', page.toString());
  params.append('limit', limit.toString());
  if (params.toString()) url += `?${params.toString()}`;
  
  const response = await api.get(url);
  return response.data as IPaginatedNews;
};

// Legacy function for backward compatibility
export const fetchAllNews = async (category?: string, status?: string) => {
  const result = await fetchNews(category, status, 1, 1000); // Get large number for "all"
  return result.news;
};

export const fetchNewsById = async (id: string) => {
  const response = await api.get(`/news/${id}`);
  return response.data as INews;
};

export const createNews = async (newsData: INewsCreate) => {
  const formData = new FormData();
  
  // Basic fields
  formData.append('title', newsData.title);
  formData.append('category', newsData.category);
  formData.append('description', newsData.description);
  formData.append('content', newsData.content);
  
  // SEO fields
  if (newsData.metaTitle) formData.append('metaTitle', newsData.metaTitle);
  if (newsData.metaDescription) formData.append('metaDescription', newsData.metaDescription);
  if (newsData.keywords) formData.append('keywords', JSON.stringify(newsData.keywords));
  if (newsData.canonicalUrl) formData.append('canonicalUrl', newsData.canonicalUrl);
  if (newsData.ogTitle) formData.append('ogTitle', newsData.ogTitle);
  if (newsData.ogDescription) formData.append('ogDescription', newsData.ogDescription);
  if (newsData.twitterTitle) formData.append('twitterTitle', newsData.twitterTitle);
  if (newsData.twitterDescription) formData.append('twitterDescription', newsData.twitterDescription);
  
  // Content fields
  if (newsData.focusKeyword) formData.append('focusKeyword', newsData.focusKeyword);
  if (newsData.tags) formData.append('tags', JSON.stringify(newsData.tags));
  if (newsData.excerpt) formData.append('excerpt', newsData.excerpt);
  if (newsData.status) formData.append('status', newsData.status);
  if (newsData.featured !== undefined) formData.append('featured', newsData.featured.toString());
  if (newsData.trending !== undefined) formData.append('trending', newsData.trending.toString());
  
  // Files
  if (newsData.image) formData.append('image', newsData.image);

  const response = await api.post('/news', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data as INews;
};

export const updateNews = async (id: string, newsData: Partial<INewsCreate>) => {
  const formData = new FormData();
  
  Object.entries(newsData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value.toString());
      }
    }
  });

  const response = await api.put(`/news/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data as INews;
};

export const deleteNews = async (id: string) => {
  const response = await api.delete(`/news/${id}`);
  return response.data;
};

// SEO Analysis Functions
export const analyzeSEO = async (content: string, focusKeyword?: string) => {
  // This would typically call an SEO analysis service
  // For now, we'll implement basic analysis
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  
  let seoScore = 50; // Base score
  
  // Basic SEO checks
  if (focusKeyword && content.toLowerCase().includes(focusKeyword.toLowerCase())) {
    seoScore += 20;
  }
  if (wordCount >= 300) seoScore += 15;
  if (wordCount >= 1000) seoScore += 10;
  
  return {
    wordCount,
    readingTime,
    seoScore: Math.min(seoScore, 100)
  };
};
