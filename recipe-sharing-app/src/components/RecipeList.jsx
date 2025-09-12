import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {
    const recipes = useRecipeStore(state => state.recipes);

    const containerStyle = {
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px'
    };

    const recipeCardStyle = {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        margin: '10px 0',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    };

    const titleStyle = {
        color: '#007bff',
        marginBottom: '8px',
        fontSize: '18px',
        textDecoration: 'none'
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
        fontSize: '14px'
    };

    if (recipes.length === 0) {
        return (
            <div style={containerStyle}>
                <p style={{ textAlign: 'center', color: '#666' }}>
                    No recipes yet. Add your first recipe above!
                </p>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>My Recipes</h2>
            {recipes.map(recipe => (
                <div key={recipe.id} style={recipeCardStyle}>
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
                        <button style={viewButtonStyle}>View Details</button>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default RecipeList;