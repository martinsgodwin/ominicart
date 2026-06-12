import React from 'react';
import Header from './components/Header';
import BannerCarousel from './components/BannerCarousel';
import WorldType from './components/WorldType';
import MediaRow from './components/MediaRow';
import Footer from './components/Footer';
import { tmdbService } from './services/tmdb';

function App() {
  return (
    <div className="min-h-screen bg-[#001B3D] overflow-x-hidden">
      <Header />
      
      <main>
        <BannerCarousel />
        
        <div className="relative z-20 -mt-20 md:-mt-32">
          <WorldType />
          
          <MediaRow 
            title="Trending Now" 
            fetchUrl={() => tmdbService.getTrending('all')} 
          />
          
          <MediaRow 
            title="Action & Adventure" 
            fetchUrl={async () => {
              const movies = await tmdbService.getMoviesByGenre(28); // Action
              const tv = await tmdbService.getTVByGenre(10759); // Action & Adventure
              return [...movies, ...tv];
            }} 
          />

          <MediaRow 
            title="Thriller" 
            fetchUrl={() => tmdbService.getMoviesByGenre(53)} 
          />

          <MediaRow 
            title="Miseries (Horror)" 
            fetchUrl={async () => {
              const movies = await tmdbService.getMoviesByGenre(27); // Horror
              const tv = await tmdbService.getTVByGenre(9648); // Mystery (TMDB doesn't have Horror for TV, using Mystery as proxy for "Miseries")
              return [...movies, ...tv];
            }} 
          />

          <MediaRow 
            title="Animations" 
            fetchUrl={() => tmdbService.getMoviesByGenre(16)} 
          />

          <MediaRow 
            title="Comedy" 
            fetchUrl={() => tmdbService.getMoviesByGenre(35)} 
          />

          <MediaRow 
            title="Fantasy" 
            fetchUrl={() => tmdbService.getMoviesByGenre(14)} 
          />

          <MediaRow 
            title="War" 
            fetchUrl={() => tmdbService.getMoviesByGenre(10752)} 
          />

          <MediaRow 
            title="Music" 
            fetchUrl={() => tmdbService.getMoviesByGenre(10402)} 
          />

          <MediaRow 
            title="History" 
            fetchUrl={() => tmdbService.getMoviesByGenre(36)} 
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
