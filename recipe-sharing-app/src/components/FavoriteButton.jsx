import { useRecipeStore } from './recipeStore';

const FavoriteButton = ({ recipeId, size = 'medium' }) => {
  const isFavorite = useRecipeStore(state => state.isFavorite(recipeId));
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  const handleToggleFavorite = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    
    if (isFavorite) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { fontSize: '16px', padding: '5px 8px' };
      case 'large':
        return { fontSize: '24px', padding: '12px 16px' };
      default:
        return { fontSize: '20px', padding: '8px 12px' };
    }
  };

  const sizeStyles = getSizeStyles();

  const buttonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: isFavorite ? '#dc3545' : '#6c757d',
    transition: 'all 0.3s ease',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...sizeStyles
  };

  return (
    <button
      onClick={handleToggleFavorite}
      style={buttonStyle}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#f8f9fa';
        e.target.style.transform = 'scale(1.1)';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'transparent';
        e.target.style.transform = 'scale(1)';
      }}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? '❤️' : '🤍'}
    </button>
  );
};

export default FavoriteButton;