import axios, { AxiosResponse } from 'axios';
import {
  AuthResponse,
  LoginCredentials,
  User,
  ProductsResponse,
  Category,
} from '@/types';

const API_BASE_URL = 'https://dummyjson.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const loginUser = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  try {
    const response: AxiosResponse<AuthResponse> = await api.post(
      '/auth/login',
      credentials
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Invalid username or password'
      );
    }
    throw new Error('Network error occurred');
  }
};

export const getCurrentUser = async (token: string): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await api.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to get user');
    }
    throw new Error('Network error occurred');
  }
};

export const getProducts = async (limit: number = 12): Promise<ProductsResponse> => {
  try {
    const response: AxiosResponse<ProductsResponse> = await api.get(
      `/products?limit=${limit}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch products'
      );
    }
    throw new Error('Network error occurred');
  }
};

export const getFilteredCategories = async () => {
  try {
    const response: AxiosResponse<string[]> = await api.get('/products/category-list');
    const allCategories = response.data;

    const navigationCategories = [
      'laptops',
      'smartphones',
      'mobile-accessories'
    ];

    return allCategories.filter(category =>
      navigationCategories.includes(category.toLowerCase())
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch categories'
      );
    }
    throw new Error('Network error occurred');
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response: AxiosResponse<Category[]> = await api.get('/products/categories');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch categories'
      );
    }
    throw new Error('Network error occurred');
  }
};

export const getProductsByCategory = async (category: string, limit: number = 12): Promise<ProductsResponse> => {
  try {
    const response: AxiosResponse<ProductsResponse> = await api.get(
      `/products/category/${category}?limit=${limit}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch products'
      );
    }
    throw new Error('Network error occurred');
  }
};

export default api;