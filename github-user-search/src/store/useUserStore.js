import { create } from 'zustand';
import { fetchUserData } from '../services/githubService';

const useUserStore = create((set, get) => ({
  users: [],
  isLoading: false,
  error: null,
  hasSearched: false,

  fetchUserData: async (searchTerm) => {
    set({ 
      isLoading: true, 
      error: null, 
      hasSearched: true 
    });

    try {
      const data = await fetchUserData(searchTerm);
      set({ 
        users: data.items || [], 
        isLoading: false 
      });
    } catch (err) {
      set({ 
        error: err.response?.data?.message || 'Failed to fetch users',
        users: [],
        isLoading: false 
      });
    }
  },

  clearSearch: () => set({ 
    users: [], 
    error: null, 
    hasSearched: false 
  }),

  clearError: () => set({ error: null }),
}));

export default useUserStore;