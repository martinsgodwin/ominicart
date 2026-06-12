import { useState, useEffect } from 'react';
import { tmdbService } from '../services/tmdb';
import { Movie } from '../types/tmdb';

export interface MediaWithLogo extends Movie {
  logo_path?: string;
}

export const useFetchMedia = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWithLogos = async (movies: Movie[]) => {
    const results = await Promise.all(
      movies.map(async (item) => {
        try {
          const images = await tmdbService.getImages(item.media_type || (item.title ? 'movie' : 'tv'), item.id);
          const logo = images.logos.find(l => l.aspect_ratio > 1); // Prefer horizontal logos
          return { ...item, logo_path: logo?.file_path };
        } catch (e) {
          return item;
        }
      })
    );
    return results;
  };

  return { fetchWithLogos, loading, setLoading, error, setError };
};
