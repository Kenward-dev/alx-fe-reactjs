import { useRecipeStore } from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';
import { useState } from 'react';

const RecipeDetails = ({ recipeId }) => {
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === parseInt(recipeId))
  );
  const [isEditing, setIsEditing] = useState(false);

  if (!recipe) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Recipe not found</h2>
        <p>The recipe you're looking for doesn't exist.</p>
      </div>
    );
  }

  const containerStyle = {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff'
  };

  const headerStyle = {
    borderBottom: '2px solid #007bff',
    paddingBottom: '10px',
    marginBottom: '20px'
  };

  const titleStyle = {
    color: '#333',
    marginBottom: '10px'
  };

  const descriptionStyle = {
    color: '#666',
    lineHeight: '1.6',
    fontSize: '16px',
    marginBottom: '20px'
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '20px'
  };

  const editButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>{recipe.title}</h1>
        <small style={{ color: '#888' }}>Recipe ID: {recipe.id}</small>
      </div>
      
      <p style={descriptionStyle}>{recipe.description}</p>
      
      {isEditing ? (
        <EditRecipeForm 
          recipe={recipe} 
          onCancel={() => setIsEditing(false)}
          onSave={() => setIsEditing(false)}
        />
      ) : (
        <div style={buttonContainerStyle}>
          <button 
            style={editButtonStyle}
            onClick={() => setIsEditing(true)}
          >
            Edit Recipe
          </button>
          <DeleteRecipeButton recipeId={recipe.id} />
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;