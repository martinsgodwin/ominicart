import axios from 'axios';
import { TMDBResponse, Movie, Genre, LogoResponse } from '../types/tmdb';

const API_KEY = '2ff044456d4fa1c8534fc9e4378e227f';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const tmdbService = {
  getTrending: async (type: 'all' | 'movie' | 'tv' = 'all') => {
    const { data } = await api.get<TMDBResponse<Movie>>(`/trending/${type}/day`);
    return data.results;
  },

  getPopular: async (type: 'movie' | 'tv' = 'movie') => {
    const { data } = await api.get<TMDBResponse<Movie>>(`/${type}/popular`);
    return data.results;
  },

  getMoviesByGenre: async (genreId: number) => {
    const { data } = await api.get<TMDBResponse<Movie>>('/discover/movie', {
      params: { with_genres: genreId, sort_by: 'vote_average.desc', 'vote_count.gte': 100 },
    });
    return data.results;
  },

  getTVByGenre: async (genreId: number) => {
    const { data } = await api.get<TMDBResponse<Movie>>('/discover/tv', {
      params: { with_genres: genreId, sort_by: 'vote_average.desc', 'vote_count.gte': 100 },
    });
    return data.results;
  },

  getImages: async (type: 'movie' | 'tv', id: number) => {
    const { data } = await api.get<LogoResponse>(`/${type}/${id}/images`, {
      params: { include_image_language: 'en,null' },
    });
    return data;
  },

  getGenres: async (type: 'movie' | 'tv' = 'movie') => {
    const { data } = await api.get<{ genres: Genre[] }>(`/genre/${type}/list`);
    return data.genres;
  },

  getImageUrl: (path: string, size: 'original' | 'w500' | 'w300' = 'original') => {
    if (!path) return '';
    return `${IMAGE_BASE_URL}/${size}${path}`;
  },
};
