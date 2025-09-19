import axios from 'axios';

const API_BASE_URL = 'https://api.github.com';

const githubApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
});

export const fetchUserData = async (username) => {
  try {
    const response = await githubApi.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const fetchUserRepositories = async (username, page = 1, perPage = 100) => {
  try {
    const response = await githubApi.get(`/users/${username}/repos`, {
      params: {
        page,
        per_page: perPage,
        sort: 'updated',
        order: 'desc'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user repositories:', error);
    throw error;
  }
};

export const searchUsers = async (searchParams, page = 1, perPage = 30) => {
  try {
    let query = '';
    
    if (searchParams.username) {
      query += searchParams.username.trim();
    }
    
    if (searchParams.location) {
      query += ` location:"${searchParams.location.trim()}"`;
    }
    
    if (searchParams.minRepos) {
      query += ` repos:>=${parseInt(searchParams.minRepos)}`;
    }
    
    if (searchParams.maxRepos) {
      query += ` repos:<=${parseInt(searchParams.maxRepos)}`;
    }
    
    if (searchParams.language) {
      query += ` language:${searchParams.language.trim()}`;
    }
    
    if (searchParams.type && searchParams.type !== 'all') {
      query += ` type:${searchParams.type}`;
    }
    
    if (searchParams.followers) {
      query += ` followers:>=${parseInt(searchParams.followers)}`;
    }
    
    if (searchParams.company) {
      query += ` in:company ${searchParams.company.trim()}`;
    }
    
    if (!query.trim()) {
      query = 'type:user';
    }
    
    const response = await githubApi.get('/search/users', {
      params: {
        q: query.trim(),
        page,
        per_page: perPage,
        sort: searchParams.sort || 'repositories',
        order: searchParams.order || 'desc'
      }
    });
    
    const enhancedUsers = await Promise.all(
      response.data.items.map(async (user) => {
        try {
          const detailedUser = await fetchUserData(user.login);
          return {
            ...user,
            name: detailedUser.name,
            bio: detailedUser.bio,
            company: detailedUser.company,
            blog: detailedUser.blog,
            location: detailedUser.location,
            email: detailedUser.email,
            hireable: detailedUser.hireable,
            public_repos: detailedUser.public_repos,
            public_gists: detailedUser.public_gists,
            followers: detailedUser.followers,
            following: detailedUser.following,
            created_at: detailedUser.created_at,
            updated_at: detailedUser.updated_at
          };
        } catch (error) {
          console.warn(`Failed to fetch detailed data for ${user.login}:`, error);
          return user;
        }
      })
    );
    
    return {
      ...response.data,
      items: enhancedUsers
    };
  } catch (error) {
    console.error('Error searching users:', error);
    if (error.response?.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Please try again later.');
    }
    if (error.response?.status === 422) {
      throw new Error('Invalid search query. Please check your search criteria.');
    }
    throw new Error(error.response?.data?.message || 'Failed to search users');
  }
};

export const getPopularLanguages = () => {
  return [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby',
    'Go', 'Rust', 'Swift', 'Kotlin', 'Dart', 'Scala', 'R', 'MATLAB',
    'HTML', 'CSS', 'Vue', 'React', 'Angular', 'Node.js'
  ];
};

//https://api.github.com/search/users?q=tom+repos:%3E42+followers:%3E1000+location:%3Elagos+language:javascript+type:user&sort=repositories&order=desc&page=1&per_page=30

export default githubApi;