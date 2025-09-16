import { useState } from 'react';

const UserCard = ({ user }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  return (
    <div className="user-card">
      <div className="avatar-container">
        {imageLoading && !imageError && (
          <div className="avatar-placeholder">Loading...</div>
        )}
        
        {imageError ? (
          <div className="avatar-fallback">
            {user.login.charAt(0).toUpperCase()}
          </div>
        ) : (
          <img 
            src={user.avatar_url} 
            alt={`${user.login}'s avatar`}
            className="user-avatar"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: imageLoading ? 'none' : 'block' }}
          />
        )}
      </div>
      
      <div className="user-info">
        <h3 className="user-login">{user.login}</h3>
        <p className="user-type">{user.type}</p>
        <a 
          href={user.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="profile-link"
        >
          View Profile
        </a>
      </div>
    </div>
  );
};

export default UserCard;