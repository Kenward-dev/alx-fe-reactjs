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

export const searchUsers = async (searchParams, page = 1, perPage = 30) => {
  try {
    let query = '';
    
    if (searchParams.username) {
      query += searchParams.username;
    }
    
    if (searchParams.location) {
      query += ` location:${searchParams.location}`;
    }
    
    if (searchParams.minRepos) {
      query += ` repos:>=${searchParams.minRepos}`;
    }
    
    if (!query.trim()) {
      throw new Error('Please provide at least one search criteria');
    }
    
    const response = await githubApi.get('/search/users', {
      params: {
        q: query.trim(),
        page,
        per_page: perPage,
        sort: 'repositories',
        order: 'desc'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

export default githubApi;