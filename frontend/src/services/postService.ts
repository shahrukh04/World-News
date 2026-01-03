import api from '../api/api'
import type { Post } from '@/types'

export interface PostListResponse {
  posts: Post[]
  pagination: {
    currentPage: number
    totalPages: number
    totalPosts: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export const postService = {
  async getPosts(params?: Record<string, any>): Promise<PostListResponse> {
    const res = await api.get('/news', { params })
    const data = res.data
    return {
      posts: (data.news || []) as Post[],
      pagination: {
        currentPage: data.pagination?.currentPage ?? 1,
        totalPages: data.pagination?.totalPages ?? 1,
        totalPosts: data.pagination?.totalItems ?? (data.pagination?.totalPosts ?? 0),
        hasNextPage: !!data.pagination?.hasNextPage,
        hasPrevPage: !!data.pagination?.hasPrevPage,
      },
    }
  },
  async getPost(idOrSlug: string): Promise<Post> {
    const res = await api.get(`/news/${idOrSlug}`)
    return res.data as Post
  },
  async createPost(data: Partial<Post> | FormData): Promise<Post> {
    const isFormData = data instanceof FormData;
    const res = await api.post('/news', data, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : undefined
    })
    return res.data as Post
  },
  async updatePost(id: string, data: Partial<Post>): Promise<Post> {
    const res = await api.put(`/news/${id}`, data)
    return res.data as Post
  },
  async deletePost(id: string): Promise<void> {
    await api.delete(`/news/${id}`)
  },
}

export default postService
