import { create } from 'zustand';
import axiosInstance from '../api/axiosInstance';
import { decodeJWT } from '../lib/utils';

const getSafeUser = () => {
  const user = localStorage.getItem('user');
  if (!user || user === 'undefined' || user === 'null') return null;
  try {
    return JSON.parse(user);
  } catch (e) {
    return null;
  }
};

const useAuthStore = create((set) => ({
  user: getSafeUser(),
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      const { token } = response.data;
      
      // Extract user from token if not provided in response
      let userData = response.data.user;
      if (!userData && token) {
        const decoded = decodeJWT(token);
        if (decoded) {
          userData = {
            ...decoded,
            name: decoded.username || decoded.name || 'User',
            role: decoded.role || 'Student'
          };
        }
      }
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      set({ 
        user: userData, 
        token: token, 
        isAuthenticated: true, 
        isLoading: false 
      });
      return true;
    } catch (error) {
      set({ 
        error: error.response?.data?.error || 'Login failed', 
        isLoading: false 
      });
      return false;
    }
  },

  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post('/auth/register', userData);
      set({ isLoading: false });
      return { success: true, message: response.data.message };
    } catch (error) {
       set({ 
        error: error.response?.data?.error || 'Registration failed', 
        isLoading: false 
      });
      return { success: false, message: error.response?.data?.error || 'Registration failed' };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, isAuthenticated: false });
  },

  clearError: () => set({ error: null })
}));

export default useAuthStore;
