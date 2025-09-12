import { useRecipeStore } from "./useRecipeStore";

// import { useRecipeStore } from '../../stores/useRecipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  const containerStyle = {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
  };

  const recipeCardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    margin: "10px 0",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const titleStyle = {
    color: "#333",
    marginBottom: "8px",
    fontSize: "18px",
  };

  const descriptionStyle = {
    color: "#666",
    lineHeight: "1.4",
  };

  return (
    <div style={containerStyle}>
      {recipes.map((recipe) => (
        <div key={recipe.id} style={recipeCardStyle}>
          <h3 style={titleStyle}>{recipe.title}</h3>
          <p style={descriptionStyle}>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
