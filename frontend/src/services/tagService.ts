import api from '../api/api'
import type { Tag } from '@/types'

export interface TagListResponse {
  tags: Tag[]
  pagination?: {
    currentPage: number
    totalPages: number
    totalTags: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export const tagService = {
  async getTags(params?: Record<string, any>): Promise<TagListResponse> {
    const res = await api.get('/tags', { params })
    return res.data.data
  },
  async getTag(idOrSlug: string): Promise<Tag> {
    const res = await api.get(`/tags/${idOrSlug}`)
    return res.data.data.tag
  },
  async createTag(data: Partial<Tag>): Promise<Tag> {
    const res = await api.post('/tags', data)
    return res.data.data.tag
  },
  async updateTag(id: string, data: Partial<Tag>): Promise<Tag> {
    const res = await api.put(`/tags/${id}`, data)
    return res.data.data.tag
  },
  async deleteTag(id: string): Promise<void> {
    await api.delete(`/tags/${id}`)
  },
  async getPopularTags(): Promise<Tag[]> {
    const res = await api.get('/tags/popular')
    return res.data.data.tags
  },
  async getFeaturedTags(): Promise<Tag[]> {
    const res = await api.get('/tags/featured')
    return res.data.data.tags
  }
}

export default tagService