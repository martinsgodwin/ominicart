import React from 'react';

interface WorldTypeItem {
  name: string;
  image: string;
}

const worlds: WorldTypeItem[] = [
  { name: 'Medieval Fantasy', image: 'https://image.tmdb.org/t/p/w780/7Ry9S9Z7Y6U6a8G1bXv3G8Z7X5.jpg' }, // House of the Dragon
  { name: 'Post-Apocalypse & Zombie', image: 'https://image.tmdb.org/t/p/w780/uDgy6hyPdZ2UnpaUhvKp9sznQTM.jpg' }, // The Last of Us
  { name: 'Dystopian Future', image: 'https://image.tmdb.org/t/p/w780/6oom5QY7KU6Y3NUNJbsli9pSTSR.jpg' }, // Blade Runner 2049
  { name: 'Space Opera & Galactic Empire', image: 'https://image.tmdb.org/t/p/w780/8btScl7pYFOHv763Z087pYpY8v.jpg' }, // Star Wars
  { name: 'Urban & Contemporary Fantasy', image: 'https://image.tmdb.org/t/p/w780/3f5vS6M6Xf9mX6Xf9mX6Xf9mX6.jpg' }, // Harry Potter (generic placeholder)
  { name: 'Steampunk & Alternate History', image: 'https://image.tmdb.org/t/p/w780/rkB4sC3metSsySjPbaquq9S3gn7.jpg' }, // Arcane
  { name: 'Western & Frontier World', image: 'https://image.tmdb.org/t/p/w780/7WsyChv66P6Wp7qO09Xp0mD8s.jpg' }, // Yellowstone
  { name: 'Time Travel & Paradox World', image: 'https://image.tmdb.org/t/p/w780/56v2KjBlU4p3XWOK48QCp3N6S1.jpg' }, // Dark
];

const WorldType: React.FC = () => {
  return (
    <section className="py-12 px-6 md:px-16">
      <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
        <span className="w-1 h-8 bg-gold rounded-full" />
        Explore Worlds
      </h3>
      
      <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-4 lg:grid-cols-4">
        {worlds.map((world, index) => (
          <div 
            key={index}
            className="flex-shrink-0 w-[280px] md:w-full aspect-video relative rounded-xl overflow-hidden group cursor-pointer border border-white/5 hover:border-skyblue/50 transition-all duration-300"
          >
            <img 
              src={world.image} 
              alt={world.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
              <span className="text-white font-bold text-sm md:text-base uppercase tracking-widest drop-shadow-lg group-hover:text-gold transition-colors">
                {world.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorldType;
