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
  image?: File;
}

export interface INews {
  _id: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  author: string;
  createdAt: string;
}

const getAuthHeader = () => {
  // Get token from Zustand persist storage
  const authStorage = localStorage.getItem('auth-storage');
  if (authStorage) {
    try {
      const { state } = JSON.parse(authStorage);
      if (state?.token) {
        return { Authorization: `Bearer ${state.token}` };
      }
    } catch (error) {
      console.error('Error parsing auth storage:', error);
    }
  }
  return {};
};

export const loginUser = async (data: IUserLogin) => {
  const response = await api.post('/users/login', data);
  return response.data;
};

export const registerUser = async (data: IUserRegister) => {
  const response = await api.post('/users/register', data);
  return response.data;
};

export const fetchNews = async (category?: string) => {
  const url = category ? `/news?category=${category}` : '/news';
  const response = await api.get(url);
  return response.data as INews[];
};

export const fetchNewsById = async (id: string) => {
  const response = await api.get(`/news/${id}`);
  return response.data as INews;
};

export const createNews = async (newsData: INewsCreate) => {
  const formData = new FormData();
  formData.append('title', newsData.title);
  formData.append('category', newsData.category);
  formData.append('description', newsData.description);
  if (newsData.image) formData.append('image', newsData.image);

  const response = await api.post('/news', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      // Authorization header will be added automatically by the interceptor
    },
  });
  return response.data as INews;
};

export const deleteNews = async (id: string) => {
  // Authorization header will be added automatically by the interceptor
  const response = await api.delete(`/news/${id}`);
  return response.data;
};
