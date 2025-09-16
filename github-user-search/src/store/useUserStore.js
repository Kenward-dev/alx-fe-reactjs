import { create } from 'zustand';
import { searchUsers } from '../services/githubApi';

const useUserStore = create((set, get) => ({
  users: [],
  isLoading: false,
  error: null,
  hasSearched: false,

  searchUsers: async (searchTerm) => {
    set({ 
      isLoading: true, 
      error: null, 
      hasSearched: true 
    });

    try {
      const data = await searchUsers(searchTerm);
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