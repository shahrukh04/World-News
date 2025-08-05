import api from '../api/api'
import type { Category } from '@/types'

export interface CategoryListResponse {
  categories: Category[]
  pagination?: {
    currentPage: number
    totalPages: number
    totalCategories: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export const categoryService = {
  async getCategories(params?: Record<string, any>): Promise<CategoryListResponse> {
    const res = await api.get('/categories', { params })
    return res.data.data
  },
  async getCategory(idOrSlug: string): Promise<Category> {
    const res = await api.get(`/categories/${idOrSlug}`)
    return res.data.data.category
  },
  async createCategory(data: Partial<Category>): Promise<Category> {
    const res = await api.post('/categories', data)
    return res.data.data.category
  },
  async updateCategory(id: string, data: Partial<Category>): Promise<Category> {
    const res = await api.put(`/categories/${id}`, data)
    return res.data.data.category
  },
  async deleteCategory(id: string): Promise<void> {
    await api.delete(`/categories/${id}`)
  },
}

export default categoryService