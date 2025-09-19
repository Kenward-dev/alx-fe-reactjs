import { create } from 'zustand';
import { searchUsers } from '../services/githubService';

const useUserStore = create((set, get) => ({
  users: [],
  isLoading: false,
  error: null,
  hasSearched: false,
  totalCount: 0,
  currentPage: 1,
  hasMore: false,
  searchParams: {},
  
  searchUsers: async (searchParams, page = 1, append = false) => {
    const state = get();
    
    set({ 
      isLoading: true, 
      error: null, 
      hasSearched: true,
      searchParams: page === 1 ? searchParams : state.searchParams
    });

    if (page === 1 && !append) {
      set({ users: [], totalCount: 0, currentPage: 1 });
    }

    try {
      const data = await searchUsers(searchParams, page, 30);
      
      const newUsers = append ? [...state.users, ...data.items] : data.items;
      const hasMore = data.items.length === 30 && newUsers.length < data.total_count;
      
      set({ 
        users: newUsers,
        totalCount: data.total_count,
        currentPage: page,
        hasMore,
        isLoading: false 
      });
      
      return data;
    } catch (err) {
      set({ 
        error: err.message || 'Failed to search users',
        users: page === 1 ? [] : state.users,
        isLoading: false 
      });
      throw err;
    }
  },

  loadMoreUsers: async () => {
    const { currentPage, searchParams, hasMore, isLoading } = get();
    
    if (!hasMore || isLoading) return;
    
    try {
      await get().searchUsers(searchParams, currentPage + 1, true);
    } catch (error) {
      console.error('Error loading more users:', error);
    }
  },

  clearSearch: () => set({ 
    users: [], 
    error: null, 
    hasSearched: false,
    totalCount: 0,
    currentPage: 1,
    hasMore: false,
    searchParams: {}
  }),

  clearError: () => set({ error: null }),
  
  setSearchParams: (params) => set({ searchParams: params }),
  
  getSearchState: () => {
    const { users, isLoading, error, hasSearched, totalCount, hasMore, currentPage } = get();
    return { users, isLoading, error, hasSearched, totalCount, hasMore, currentPage };
  }
}));

export default useUserStore;