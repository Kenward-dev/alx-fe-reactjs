# Recipe Sharing App

A React-based recipe management application with smart recommendations and favorites system.

## Features

- **Recipe Management**: Add, edit, delete, and view recipes
- **Search**: Real-time search through recipe titles and descriptions  
- **Favorites System**: Mark recipes as favorites with heart icons
- **Smart Recommendations**: AI-powered suggestions based on your favorites
- **Responsive Design**: Clean, modern interface with hover effects

## Tech Stack

- **Frontend**: React 18, React Router
- **State Management**: Zustand store
- **Styling**: Inline styles with modern design patterns

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install 
   ```

2. **Run the application**:
   ```bash
   npm run dev
   ```

3. **Start adding recipes** and mark favorites to get personalized recommendations!

## Key Components

- `AddRecipeForm` - Create new recipes with validation
- `RecipeList` - Display and search through recipes
- `FavoritesList` - View favorited recipes
- `RecommendationsList` - Smart recipe suggestions
- `SearchBar` - Real-time recipe filtering

## How Recommendations Work

The app analyzes your favorite recipes and suggests new ones based on:
- **Keyword similarity** - Matches words in titles/descriptions
- **Recent activity** - Boosts recently viewed recipes
- **Randomization** - Prevents stale suggestions

## File Structure

```
src/
├── components/
│   ├── AddRecipeForm.jsx
│   ├── RecipeList.jsx
│   ├── FavoriteButton.jsx
|   ├── recipeStore.js  # Zustand state management
│   └── ...
└── App.jsx               # Main app with routing
```

Built with ❤️ using React and Zustand