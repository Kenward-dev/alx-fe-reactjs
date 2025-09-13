import { create } from 'zustand';

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [],
  userInteractions: [],

  addRecipe: (newRecipe) => {
    try {
      const recipe = { 
        ...newRecipe, 
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      
      set(state => {
        const newRecipes = [...state.recipes, recipe];
        console.log('Recipe added:', recipe);
        return { recipes: newRecipes };
      });
      
      setTimeout(() => {
        get().initializeFilteredRecipes();
      }, 0);
      
    } catch (error) {
      console.error('Error adding recipe:', error);
      throw error;
    }
  },

  setRecipes: (recipes) => set({ recipes }),
  
  updateRecipe: (id, updatedRecipe) => {
    set(state => {
      const updatedRecipes = state.recipes.map(recipe => 
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      );
      return { recipes: updatedRecipes };
    });
    get().initializeFilteredRecipes();
  },
  
  deleteRecipe: (id) => {
    set(state => {
      const filteredRecipes = state.recipes.filter(recipe => recipe.id !== id);
      const updatedFavorites = state.favorites.filter(favoriteId => favoriteId !== id);
      return { 
        recipes: filteredRecipes,
        favorites: updatedFavorites
      };
    });
    get().initializeFilteredRecipes();
    get().generateRecommendations();
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes(term);
  },

  filterRecipes: (term) => {
    if (!term.trim()) {
      set({ filteredRecipes: [] });
      return;
    }

    const filtered = get().recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(term.toLowerCase()) ||
      recipe.description.toLowerCase().includes(term.toLowerCase())
    );
    
    set({ filteredRecipes: filtered });
  },

  initializeFilteredRecipes: () => {
    const currentSearchTerm = get().searchTerm;
    if (currentSearchTerm) {
      get().filterRecipes(currentSearchTerm);
    }
  },

  getDisplayRecipes: () => {
    const state = get();
    return state.searchTerm ? state.filteredRecipes : state.recipes;
  },

  addFavorite: (recipeId) => {
    set((state) => {
      if (!state.favorites.includes(recipeId)) {
        const newFavorites = [...state.favorites, recipeId];
        const newInteraction = {
          type: 'favorite',
          recipeId,
          timestamp: Date.now()
        };
        return { 
          favorites: newFavorites,
          userInteractions: [...state.userInteractions, newInteraction]
        };
      }
      return state;
    });
    setTimeout(() => get().generateRecommendations(), 100);
  },

  removeFavorite: (recipeId) => {
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    }));
    setTimeout(() => get().generateRecommendations(), 100);
  },

  isFavorite: (recipeId) => {
    return get().favorites.includes(recipeId);
  },

  getFavoriteRecipes: () => {
    const { recipes, favorites } = get();
    return favorites
      .map(id => recipes.find(recipe => recipe.id === id))
      .filter(Boolean);
  },

  addUserInteraction: (type, recipeId) => {
    set(state => ({
      userInteractions: [...state.userInteractions, {
        type,
        recipeId,
        timestamp: Date.now()
      }]
    }));
  },

  generateRecommendations: () => {
    const { recipes, favorites, userInteractions } = get();
    
    if (recipes.length === 0) {
      set({ recommendations: [] });
      return;
    }
    
    if (favorites.length === 0) {
      const shuffled = [...recipes].sort(() => Math.random() - 0.5);
      set({ recommendations: shuffled.slice(0, Math.min(3, recipes.length)) });
      return;
    }
    
    const favoriteRecipes = favorites
      .map(id => recipes.find(recipe => recipe.id === id))
      .filter(Boolean);
    
    const recommendations = recipes
      .filter(recipe => !favorites.includes(recipe.id)) 
      .map(recipe => {
        let score = 0;
        
        favoriteRecipes.forEach(favRecipe => {
          const favWords = (favRecipe.title + ' ' + favRecipe.description)
            .toLowerCase().split(/\s+/);
          const recipeWords = (recipe.title + ' ' + recipe.description)
            .toLowerCase().split(/\s+/);
          
          const commonWords = favWords.filter(word => 
            word.length > 3 && recipeWords.includes(word)
          );
          score += commonWords.length;
        });
        
        const recentViews = userInteractions
          .filter(interaction => 
            interaction.type === 'view' && 
            interaction.recipeId === recipe.id &&
            Date.now() - interaction.timestamp < 7 * 24 * 60 * 60 * 1000 
          );
        score += recentViews.length * 2;
        
        score += Math.random();
        
        return { ...recipe, recommendationScore: score };
      })
      .sort((a, b) => b.recommendationScore - a.recommendationScore)
      .slice(0, 5);
    
    set({ recommendations });
  }
}));