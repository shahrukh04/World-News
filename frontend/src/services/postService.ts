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
    const res = await api.get('/posts', { params })
    return res.data.data
  },
  async getPost(idOrSlug: string): Promise<Post> {
    const res = await api.get(`/posts/${idOrSlug}`)
    return res.data.data.post
  },
  async createPost(data: Partial<Post>): Promise<Post> {
    const res = await api.post('/posts', data)
    return res.data.data.post
  },
  async updatePost(id: string, data: Partial<Post>): Promise<Post> {
    const res = await api.put(`/posts/${id}`, data)
    return res.data.data.post
  },
  async deletePost(id: string): Promise<void> {
    await api.delete(`/posts/${id}`)
  },
}

export default postService