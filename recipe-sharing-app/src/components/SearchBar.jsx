import React from 'react';
import { useRecipeStore } from './recipeStore';

const SearchBar = () => {
  const searchTerm = useRecipeStore(state => state.searchTerm);
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);

  const containerStyle = {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '0 20px'
  };

  const inputContainerStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 45px 12px 15px',
    fontSize: '16px',
    border: '2px solid #007bff',
    borderRadius: '25px',
    outline: 'none',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,123,255,0.1)',
    transition: 'all 0.3s ease'
  };

  const searchIconStyle = {
    position: 'absolute',
    right: '15px',
    color: '#007bff',
    fontSize: '18px',
    pointerEvents: 'none'
  };

  const clearButtonStyle = {
    position: 'absolute',
    right: searchTerm ? '45px' : '-100px',
    background: 'none',
    border: 'none',
    color: '#666',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'all 0.3s ease',
    padding: '5px'
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div style={containerStyle}>
      <div style={inputContainerStyle}>
        <input
          type="text"
          value={searchTerm}
          placeholder="Search recipes by title or description..."
          onChange={(e) => setSearchTerm(e.target.value)}
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = '#0056b3';
            e.target.style.boxShadow = '0 4px 8px rgba(0,123,255,0.2)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#007bff';
            e.target.style.boxShadow = '0 2px 4px rgba(0,123,255,0.1)';
          }}
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            style={clearButtonStyle}
            title="Clear search"
          >
            ×
          </button>
        )}
        <span style={searchIconStyle}>🔍</span>
      </div>
    </div>
  );
};

export default SearchBar;