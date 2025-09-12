import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import './App.css';

const Home = () => {
  return (
    <>
      <AddRecipeForm />
      <RecipeList />
    </>
  );
};

const RecipeDetailsPage = () => {
  const recipeId = window.location.pathname.split('/').pop();
  return <RecipeDetails recipeId={recipeId} />;
};

function App() {
  const navStyle = {
    backgroundColor: '#f8f9fa',
    padding: '15px 0',
    borderBottom: '1px solid #dee2e6',
    marginBottom: '20px'
  };

  const navContainerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 20px'
  };

  const linkStyle = {
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: '500'
  };

  return (
    <Router>
      <div className="App">
        <nav style={navStyle}>
          <div style={navContainerStyle}>
            <Link to="/" style={linkStyle}>
              🍳 Recipe Sharing App
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;