import { useRecipeStore } from './recipeStore';

const DeleteRecipeButton = ({ recipeId, onDelete }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this recipe? This action cannot be undone.');
    
    if (confirmDelete) {
      deleteRecipe(recipeId);
      if (onDelete) onDelete(); 
    }
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  const buttonHoverStyle = {
    backgroundColor: '#c82333'
  };

  return (
    <button 
      onClick={handleDelete}
      style={buttonStyle}
      onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
      onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;