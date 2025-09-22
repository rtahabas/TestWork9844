import { create } from 'zustand';
import { AuthStore, LoginCredentials } from '@/types';
import { loginUser, getCurrentUser } from '@/services/api';

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    try {
      set({ isLoading: true, error: null });

      const authResponse = await loginUser(credentials);

      localStorage.setItem('accessToken', authResponse.accessToken);
      localStorage.setItem('refreshToken', authResponse.refreshToken);

      set({
        user: {
          id: authResponse.id,
          username: authResponse.username,
          email: authResponse.email,
          firstName: authResponse.firstName,
          lastName: authResponse.lastName,
          gender: authResponse.gender,
          image: authResponse.image,
        },
        accessToken: authResponse.accessToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      error: null,
    });
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  setError: (error: string | null) => set({ error }),
}));

// Initialize auth state from localStorage on app load
export const initializeAuth = async () => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    try {
      useAuthStore.getState().setLoading(true);
      const user = await getCurrentUser(token);

      useAuthStore.setState({
        user,
        accessToken: token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      // Token is invalid, clear storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      useAuthStore.getState().setLoading(false);
    }
  }
};