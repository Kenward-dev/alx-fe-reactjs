import { useState } from 'react';

const UserCard = ({ user, detailed = false }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  if (detailed) {
    return (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              {imageLoading && !imageError && (
                <div className="w-20 h-20 rounded-full bg-white/20 animate-pulse flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
              
              {imageError ? (
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl font-bold">
                  {user.login.charAt(0).toUpperCase()}
                </div>
              ) : (
                <img 
                  src={user.avatar_url} 
                  alt={`${user.login}'s avatar`}
                  className={`w-20 h-20 rounded-full border-3 border-white object-cover ${imageLoading ? 'hidden' : 'block'}`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              )}
            </div>
            
            <div className="flex-1 text-white">
              <h3 className="text-xl font-bold truncate">
                {user.name || user.login}
              </h3>
              <p className="text-blue-100 text-sm">@{user.login}</p>
              <div className="flex items-center mt-1">
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full capitalize">
                  {user.type}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Bio */}
          {user.bio && (
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {user.bio}
            </p>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-xl font-bold text-gray-900">
                {formatNumber(user.public_repos)}
              </div>
              <div className="text-xs text-gray-500">Repos</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-xl font-bold text-gray-900">
                {formatNumber(user.followers)}
              </div>
              <div className="text-xs text-gray-500">Followers</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-xl font-bold text-gray-900">
                {formatNumber(user.following)}
              </div>
              <div className="text-xs text-gray-500">Following</div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-3 mb-6">
            {user.location && (
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="truncate">{user.location}</span>
              </div>
            )}
            
            {user.company && (
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
                <span className="truncate">{user.company}</span>
              </div>
            )}

            {user.blog && (
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <a 
                  href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 truncate"
                >
                  {user.blog}
                </a>
              </div>
            )}
            
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>Joined {formatDate(user.created_at)}</span>
            </div>
          </div>

          {/* Action Button */}
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          >
            View GitHub Profile
          </a>
        </div>
      </div>
    );
  }

  // Compact card version
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 border border-gray-100">
      <div className="flex items-center space-x-3 mb-3">
        <div className="relative flex-shrink-0">
          {imageLoading && !imageError && (
            <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
          )}
          
          {imageError ? (
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              {user.login.charAt(0).toUpperCase()}
            </div>
          ) : (
            <img 
              src={user.avatar_url} 
              alt={`${user.login}'s avatar`}
              className={`w-12 h-12 rounded-full border-2 border-gray-200 object-cover ${imageLoading ? 'hidden' : 'block'}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-900 truncate">
            {user.name || user.login}
          </h3>
          <p className="text-sm text-blue-600 truncate">@{user.login}</p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="flex justify-between text-xs text-gray-500 mb-3">
        <span>{formatNumber(user.public_repos)} repos</span>
        <span>{formatNumber(user.followers)} followers</span>
        <span className="capitalize">{user.type}</span>
      </div>

      {/* Action Button */}
      <a 
        href={user.html_url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full text-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        View Profile
      </a>
    </div>
  );
};

export default UserCard;