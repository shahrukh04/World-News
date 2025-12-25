import api from '../api/api'; // Import the configured Axios instance
import type { LoginCredentials, AuthResponse, ApiResponse, User } from '@/types';

type LoginApiResponse = {
  status: string;
  token: string;
  data: {
    user: User;
  };
  refreshToken?: string; // Optional refreshToken
};

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<LoginApiResponse>('/users/login', credentials);
    const apiData = response.data;

    // Create a standardized object for your Zustand store
    const authPayload: AuthResponse = {
      token: apiData.token,
      user: apiData.data.user,
      // Your API does not send a refresh token, so we explicitly set it to null.
      refreshToken: apiData.refreshToken || null, 
    };
    
    return authPayload;
  },
  /**
   * Logs the user out by clearing the authentication state from localStorage.
   * This is typically handled by your state management store's logout action.
   */
  async logout(): Promise<void> {
    // The primary action is client-side: remove the token from the store,
    // which should in turn clear it from localStorage via the persist middleware.
    // You could also call a backend endpoint to invalidate the token if you implement that.
    // await api.post('/users/logout');
  },

  /**
   * Fetches the profile of the currently authenticated user.
   * @returns The user object.
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    const response = await api.get<ApiResponse<User>>('/users/me');
    return response.data;
  },

  /**
   * Updates the profile of the currently authenticated user.
   * @param data - The fields to update (e.g., name, bio).
   * @returns The updated user object.
   */
  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    const response = await api.patch<ApiResponse<User>>('/users/updateMe', data);
    return response.data;
  },
};
