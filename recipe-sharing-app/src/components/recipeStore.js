import { create } from 'zustand'

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  
  addRecipe: (newRecipe) => set(state => {
    const newRecipes = [...state.recipes, { ...newRecipe, id: Date.now() }];
    return { recipes: newRecipes };
  }),
  
  setRecipes: (recipes) => set({ recipes }),
  
  updateRecipe: (id, updatedRecipe) => set(state => {
    const updatedRecipes = state.recipes.map(recipe => 
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    );
    return { recipes: updatedRecipes };
  }),
  
  deleteRecipe: (id) => set(state => {
    const filteredRecipes = state.recipes.filter(recipe => recipe.id !== id);
    return { recipes: filteredRecipes };
  }),
  
  setSearchTerm: (term) => set(() => {
    const state = get();
    const filtered = state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(term.toLowerCase()) ||
      recipe.description.toLowerCase().includes(term.toLowerCase())
    );
    return { 
      searchTerm: term,
      filteredRecipes: filtered
    };
  }),
  
  filterRecipes: () => set(state => ({
    filteredRecipes: state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase())
    )
  })),
  
  initializeFilteredRecipes: () => set(state => ({
    filteredRecipes: state.searchTerm 
      ? state.recipes.filter(recipe =>
          recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase())
        )
      : state.recipes
  })),
  
  getDisplayRecipes: () => {
    const state = get();
    return state.searchTerm ? state.filteredRecipes : state.recipes;
  }
}));