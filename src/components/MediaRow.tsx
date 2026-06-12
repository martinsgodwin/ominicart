import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { tmdbService } from '../services/tmdb';
import { useFetchMedia, MediaWithLogo } from '../hooks/useFetchMedia';
import { Star } from 'lucide-react';

interface MediaRowProps {
  title: string;
  fetchUrl: () => Promise<any[]>;
}

const MediaRow: React.FC<MediaRowProps> = ({ title, fetchUrl }) => {
  const [items, setItems] = useState<MediaWithLogo[]>([]);
  const { fetchWithLogos } = useFetchMedia();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchUrl();
        const sorted = data.sort((a, b) => b.vote_average - a.vote_average).slice(0, 30);
        const withLogos = await fetchWithLogos(sorted);
        setItems(withLogos);
      } catch (error) {
        console.error(`Error loading ${title}:`, error);
      }
    };
    loadData();
  }, [title, fetchUrl]);

  if (items.length === 0) return null;

  return (
    <section className="py-8 px-6 md:px-16 group">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-skyblue rounded-full" />
        {title}
      </h3>
      
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={16}
        slidesPerView={1.5}
        breakpoints={{
          640: { slidesPerView: 2.5 },
          1024: { slidesPerView: 4.5 },
          1280: { slidesPerView: 5.5 },
        }}
        className="!overflow-visible"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative aspect-video rounded-lg overflow-hidden cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-300 group/card">
              <img
                src={tmdbService.getImageUrl(item.backdrop_path, 'w500')}
                alt={item.title || item.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity flex flex-col justify-end p-4">
                {item.logo_path ? (
                  <img
                    src={tmdbService.getImageUrl(item.logo_path, 'w300')}
                    alt="Logo"
                    className="h-8 object-contain object-left mb-2"
                  />
                ) : (
                  <h4 className="text-sm font-bold text-white mb-1 truncate">
                    {item.title || item.name}
                  </h4>
                )}
                <div className="flex items-center gap-2">
                  <Star size={12} className="text-gold fill-gold" />
                  <span className="text-xs text-gold font-bold">
                    {Math.round(item.vote_average * 10)}%
                  </span>
                  <span className="text-[10px] text-white/60">
                    {item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0]}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default MediaRow;
