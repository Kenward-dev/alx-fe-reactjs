import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import { useEffect } from 'react';

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);
  const favorites = useRecipeStore(state => state.favorites);
  const recipes = useRecipeStore(state => state.recipes);

  useEffect(() => {
    generateRecommendations();
  }, [favorites.length, recipes.length, generateRecommendations]);

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

  const refreshButtonStyle = {
    padding: '6px 12px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    fontSize: '12px',
    marginLeft: '10px'
  };

  const recipeCardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px 0',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    position: 'relative',
    borderLeft: '4px solid #ffc107'
  };

  const favoriteIconStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px'
  };

  const recommendationBadgeStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: '#ffc107',
    color: '#000',
    fontSize: '10px',
    padding: '2px 6px',
    borderRadius: '8px',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  };

  const titleStyle = {
    color: '#007bff',
    marginBottom: '8px',
    fontSize: '18px',
    textDecoration: 'none',
    paddingRight: '50px', 
    paddingLeft: '60px' 
  };

  const descriptionStyle = {
    color: '#666',
    lineHeight: '1.4',
    marginBottom: '10px'
  };

  const linkStyle = {
    textDecoration: 'none'
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
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

  const tryItButtonStyle = {
    padding: '6px 12px',
    backgroundColor: '#ffc107',
    color: '#000',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold'
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

  if (recipes.length === 0) {
    return (
      <div style={containerStyle}>
        <h2 style={headerStyle}>
          <span>🎯 Recommended for You</span>
        </h2>
        <div style={emptyStateStyle}>
          <div style={emptyIconStyle}>📝</div>
          <h3>No recipes yet!</h3>
          <p>Add some recipes first, then we'll provide personalized recommendations.</p>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div style={containerStyle}>
        <h2 style={headerStyle}>
          <span>🎯 Recommended for You</span>
          <button 
            style={refreshButtonStyle}
            onClick={generateRecommendations}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}
          >
            🔄 Refresh
          </button>
        </h2>
        <div style={emptyStateStyle}>
          <div style={emptyIconStyle}>🤔</div>
          <h3>Building your recommendations...</h3>
          <p>Start by adding some recipes to your favorites to get personalized recommendations!</p>
          <button 
            style={tryItButtonStyle}
            onClick={generateRecommendations}
          >
            Generate Recommendations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>
        <span>🎯 Recommended for You</span>
        <button 
          style={refreshButtonStyle}
          onClick={generateRecommendations}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}
          title="Get new recommendations"
        >
          🔄 Refresh
        </button>
      </h2>

      <div style={{ 
        fontSize: '14px', 
        color: '#666', 
        textAlign: 'center', 
        marginBottom: '20px',
        fontStyle: 'italic'
      }}>
        Based on your favorites and preferences
      </div>

      {recommendations.map((recipe, index) => (
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
          <div style={recommendationBadgeStyle}>
            #{index + 1} Pick
          </div>

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
          
          <div style={buttonContainerStyle}>
            <Link to={`/recipe/${recipe.id}`}>
              <button 
                style={viewButtonStyle}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
              >
                View Recipe
              </button>
            </Link>
            <button 
              style={tryItButtonStyle}
              onClick={() => {
                console.log(`User interested in trying: ${recipe.title}`);
              }}
              title="Mark as interested"
            >
              ⭐ Try It
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendationsList;