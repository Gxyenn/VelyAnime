import axios from 'axios';

const API_BASE_URL = 'https://www.sankavollerei.com/anime';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Vely Anime/1.0.0'
  }
});

// Helper untuk handle response
const handleResponse = (response) => {
  if (response.data.status === 'success') {
    return response.data.data;
  }
  throw new Error(response.data.message || 'API Error');
};

// Anime Endpoints - Berdasarkan response actual
export const animeAPI = {
  // Home page - ongoing anime
  getHome: () => api.get('/home').then(handleResponse),
  
  // Search anime
  searchAnime: (keyword) => api.get('/search', {
    params: { q: keyword }
  }).then(handleResponse),
  
  // Anime detail by slug
  getAnimeDetail: (slug) => api.get(`/anime/${slug}`).then(handleResponse),
  
  // Episodes list
  getEpisodes: (slug) => api.get(`/anime/${slug}/episodes`).then(handleResponse),
  
  // Streaming links for episode
  getStreamingLinks: (slug, episode) => api.get(`/anime/${slug}/episode/${episode}`).then(handleResponse),
  
  // Popular anime
  getPopular: () => api.get('/popular').then(handleResponse),
  
  // Completed anime
  getCompleted: () => api.get('/completed').then(handleResponse),
  
  // Genres list
  getGenres: () => api.get('/genres').then(handleResponse),
  
  // Anime by genre
  getAnimeByGenre: (genre) => api.get(`/genre/${genre}`).then(handleResponse),
  
  // Anime by season
  getAnimeBySeason: (season) => api.get(`/season/${season}`).then(handleResponse)
};

// Donghua Endpoints - Berdasarkan documentation
export const donghuaAPI = {
  getHome: () => api.get('/donghua/home').then(handleResponse),
  getOngoing: () => api.get('/donghua/ongoing').then(handleResponse),
  getCompleted: () => api.get('/donghua/completed').then(handleResponse),
  search: (keyword) => api.get('/donghua/search', {
    params: { q: keyword }
  }).then(handleResponse),
  getDetail: (slug) => api.get(`/donghua/${slug}`).then(handleResponse),
  getEpisode: (slug, episode) => api.get(`/donghua/${slug}/episode/${episode}`).then(handleResponse),
  getGenres: () => api.get('/donghua/genres').then(handleResponse),
  getByGenre: (genre) => api.get(`/donghua/genre/${genre}`).then(handleResponse)
};

// Error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Network error');
  }
);

export default api;