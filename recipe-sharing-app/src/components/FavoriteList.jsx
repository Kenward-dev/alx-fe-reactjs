import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';

const FavoritesList = () => {
  const getFavoriteRecipes = useRecipeStore(state => state.getFavoriteRecipes);
  const favoriteRecipes = getFavoriteRecipes();

  const containerStyle = {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  };

  const recipeCardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px 0',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    position: 'relative'
  };

  const favoriteIconStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px'
  };

  const titleStyle = {
    color: '#007bff',
    marginBottom: '8px',
    fontSize: '18px',
    textDecoration: 'none',
    paddingRight: '50px' 
  };

  const descriptionStyle = {
    color: '#666',
    lineHeight: '1.4',
    marginBottom: '10px'
  };

  const linkStyle = {
    textDecoration: 'none'
  };

  const viewButtonStyle = {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s ease'
  };

  const emptyStateStyle = {
    textAlign: 'center',
    color: '#666',
    padding: '40px 20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    margin: '20px 0'
  };

  const emptyIconStyle = {
    fontSize: '48px',
    marginBottom: '15px',
    opacity: 0.5
  };

  if (favoriteRecipes.length === 0) {
    return (
      <div style={containerStyle}>
        <h2 style={headerStyle}>
          <span>❤️ My Favorites</span>
        </h2>
        <div style={emptyStateStyle}>
          <div style={emptyIconStyle}>💔</div>
          <h3>No favorites yet!</h3>
          <p>Start exploring recipes and click the heart icon to add them to your favorites.</p>
          <p>Your favorite recipes will appear here for quick access.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>
        <span>❤️ My Favorites</span>
        <span style={{ 
          backgroundColor: '#dc3545', 
          color: 'white', 
          borderRadius: '12px', 
          padding: '4px 8px', 
          fontSize: '14px',
          fontWeight: 'normal'
        }}>
          {favoriteRecipes.length}
        </span>
      </h2>

      {favoriteRecipes.map(recipe => (
        <div 
          key={recipe.id} 
          style={recipeCardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
          }}
        >
          <div style={favoriteIconStyle}>
            <FavoriteButton recipeId={recipe.id} size="small" />
          </div>

          <Link to={`/recipe/${recipe.id}`} style={linkStyle}>
            <h3 style={titleStyle}>{recipe.title}</h3>
          </Link>
          
          <p style={descriptionStyle}>
            {recipe.description.length > 100 
              ? `${recipe.description.substring(0, 100)}...` 
              : recipe.description
            }
          </p>
          
          <Link to={`/recipe/${recipe.id}`}>
            <button 
              style={viewButtonStyle}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
            >
              View Recipe
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;