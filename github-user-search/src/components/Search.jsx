import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setError(null);
    setUserData(null);

    try {
      const data = await fetchUserData(searchTerm.trim());
      setUserData(data);
    } catch (err) {
      setError('Looks like we cant find the user');
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Enter GitHub username..."
            value={searchTerm}
            onChange={handleInputChange}
            disabled={isLoading}
            className="search-input"
          />
          <button 
            type="submit" 
            disabled={isLoading || !searchTerm.trim()}
            className="search-button"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {isLoading && (
        <div className="loading-message">Loading...</div>
      )}

      {error && (
        <div className="error-message">{error}</div>
      )}

      {userData && !isLoading && !error && (
        <div className="search-results">
          <div className="user-card">
            <div className="user-avatar-container">
              <img 
                src={userData.avatar_url} 
                alt={`${userData.login}'s avatar`}
                className="user-avatar"
              />
            </div>
            <div className="user-info">
              <h3 className="user-name">{userData.name || userData.login}</h3>
              <p className="user-login">@{userData.login}</p>
              {userData.bio && <p className="user-bio">{userData.bio}</p>}
              <div className="user-stats">
                <span className="stat">
                  <strong>Followers:</strong> {userData.followers}
                </span>
                <span className="stat">
                  <strong>Following:</strong> {userData.following}
                </span>
                <span className="stat">
                  <strong>Repos:</strong> {userData.public_repos}
                </span>
              </div>
              <a 
                href={userData.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="profile-link"
              >
                View GitHub Profile
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;