import SearchBar from './components/Search';
import UserList from './components/UserList';
import useUserStore from './store/useUserStore';
import './App.css';

function App() {
  const { users, isLoading, error, hasSearched, searchUsers } = useUserStore();

  return (
    <div className="App">
      <header className="app-header">
        <h1>GitHub User Search</h1>
        <p>Search for GitHub users and explore their profiles</p>
      </header>

      <main className="app-main">
        <SearchBar onSearch={searchUsers} isLoading={isLoading} />
     
        {hasSearched && (
          <UserList 
            users={users} 
            isLoading={isLoading} 
            error={error} 
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Built by Kenward with React & GitHub API</p>
      </footer>
    </div>
  );
}

export default App;