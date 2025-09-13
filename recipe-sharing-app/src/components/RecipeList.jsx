import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import FavoriteButton from './FavoriteButton';

const RecipeList = () => {
    const recipes = useRecipeStore(state => state.recipes);
    const searchTerm = useRecipeStore(state => state.searchTerm);
    const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
    const initializeFilteredRecipes = useRecipeStore(state => state.initializeFilteredRecipes);

    const displayRecipes = searchTerm ? filteredRecipes : recipes;

    useEffect(() => {
        initializeFilteredRecipes();
    }, [recipes.length, initializeFilteredRecipes]);

    const containerStyle = {
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px'
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333'
    };

    const resultsInfoStyle = {
        textAlign: 'center',
        marginBottom: '15px',
        color: '#666',
        fontSize: '14px',
        fontStyle: 'italic'
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

    const noResultsStyle = {
        textAlign: 'center',
        color: '#666',
        padding: '40px 20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        margin: '20px 0'
    };

    const highlightSearchTerm = (text, term) => {
        if (!term) return text;
        
        const regex = new RegExp(`(${term})`, 'gi');
        const parts = text.split(regex);
        
        return parts.map((part, index) => 
            regex.test(part) ? 
                <span key={index} style={{ backgroundColor: '#fff3cd', fontWeight: 'bold' }}>
                    {part}
                </span> : 
                part
        );
    };

    if (recipes.length === 0) {
        return (
            <div style={containerStyle}>
                <div style={noResultsStyle}>
                    <p>No recipes yet. Add your first recipe above!</p>
                </div>
            </div>
        );
    }

    if (searchTerm && displayRecipes.length === 0) {
        return (
            <div style={containerStyle}>
                <h2 style={headerStyle}>Search Results</h2>
                <div style={noResultsStyle}>
                    <p>No recipes found matching "{searchTerm}"</p>
                    <p>Try adjusting your search terms or browse all recipes.</p>
                </div>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <h2 style={headerStyle}>
                {searchTerm ? 'Search Results' : 'My Recipes'}
            </h2>
            
            {searchTerm && (
                <div style={resultsInfoStyle}>
                    Found {displayRecipes.length} recipe{displayRecipes.length !== 1 ? 's' : ''} 
                    {displayRecipes.length > 0 && ` matching "${searchTerm}"`}
                </div>
            )}

            {displayRecipes.map(recipe => (
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
                        <h3 style={titleStyle}>
                            {highlightSearchTerm(recipe.title, searchTerm)}
                        </h3>
                    </Link>
                    <p style={descriptionStyle}>
                        {recipe.description.length > 100 ? (
                            <>
                                {highlightSearchTerm(
                                    recipe.description.substring(0, 100), 
                                    searchTerm
                                )}...
                            </>
                        ) : (
                            highlightSearchTerm(recipe.description, searchTerm)
                        )}
                    </p>
                    <Link to={`/recipe/${recipe.id}`}>
                        <button 
                            style={viewButtonStyle}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
                        >
                            View Details
                        </button>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default RecipeList;