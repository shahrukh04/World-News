import { api } from './api'

export interface DashboardStats {
  totalPosts: number
  totalViews: number
  totalUsers: number
  totalComments: number
  growthRate: number
}

export const analyticsService = {
  async getDashboardStats(): Promise<DashboardStats> {
    const res = await api.get('/analytics/dashboard')
    return res.data.data
  },
  async getPostAnalytics(postId: string, days?: number) {
    const res = await api.get(`/analytics/posts/${postId}`, { params: { days } })
    return res.data.data
  },
  async getCategoryAnalytics(categoryId: string, days?: number) {
    const res = await api.get(`/analytics/categories/${categoryId}`, { params: { days } })
    return res.data.data
  }
}

export default analyticsService