import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { tmdbService } from '../services/tmdb';
import { useFetchMedia, MediaWithLogo } from '../hooks/useFetchMedia';
import { Star, Play, Info } from 'lucide-react';

const BannerCarousel: React.FC = () => {
  const [items, setItems] = useState<MediaWithLogo[]>([]);
  const { fetchWithLogos } = useFetchMedia();

  useEffect(() => {
    const loadData = async () => {
      try {
        const movies = await tmdbService.getPopular('movie');
        const tv = await tmdbService.getPopular('tv');
        const combined = [...movies, ...tv]
          .sort((a, b) => b.vote_average - a.vote_average)
          .slice(0, 20);
        
        const withLogos = await fetchWithLogos(combined);
        setItems(withLogos);
      } catch (error) {
        console.error('Error loading banner data:', error);
      }
    };
    loadData();
  }, []);

  if (items.length === 0) return <div className="h-[80vh] bg-navy animate-pulse" />;

  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="h-full w-full"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative h-full w-full">
              {/* Backdrop Image */}
              <div className="absolute inset-0">
                <img
                  src={tmdbService.getImageUrl(item.backdrop_path)}
                  alt={item.title || item.name}
                  className="h-full w-full object-cover"
                />
                {/* Cinematic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#001B3D] via-[#001B3D]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001B3D] via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-center px-6 md:px-16 max-w-3xl z-10">
                {item.logo_path ? (
                  <img
                    src={tmdbService.getImageUrl(item.logo_path, 'w500')}
                    alt="Logo"
                    className="h-24 md:h-40 object-contain object-left mb-6 drop-shadow-2xl"
                  />
                ) : (
                  <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter text-white drop-shadow-lg">
                    {item.title || item.name}
                  </h2>
                )}

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1 bg-gold/20 px-2 py-1 rounded border border-gold/30">
                    <Star size={16} className="text-gold fill-gold" />
                    <span className="text-gold font-bold text-sm">
                      {Math.round(item.vote_average * 10)}%
                    </span>
                  </div>
                  <span className="text-white/60 text-sm font-medium">
                    {item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0]}
                  </span>
                  <span className="px-2 py-0.5 border border-white/30 text-[10px] rounded text-white/60 uppercase">
                    Ultra HD
                  </span>
                </div>

                <p className="text-white/80 text-sm md:text-lg line-clamp-3 mb-8 leading-relaxed max-w-2xl">
                  {item.overview}
                </p>

                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 bg-white text-navy px-8 py-3 rounded-md font-bold hover:bg-gold transition-colors">
                    <Play size={20} fill="currentColor" />
                    Watch Now
                  </button>
                  <button className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-md font-bold hover:bg-white/20 transition-colors border border-white/10">
                    <Info size={20} />
                    Details
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerCarousel;
