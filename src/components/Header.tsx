import React, { useState, useEffect } from 'react';
import { Search, Grid, User, Home, Film, Tv } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HeaderProps {
  bannerColor?: string;
}

const Header: React.FC<HeaderProps> = ({ bannerColor = 'transparent' }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', icon: <Home size={20} />, path: '/' },
    { name: 'Movies', icon: <Film size={20} />, path: '/movies' },
    { name: 'Series', icon: <Tv size={20} />, path: '/series' },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-500 px-6 py-4 flex items-center justify-between',
          isScrolled ? 'bg-[#001B3D]/90 backdrop-blur-md' : 'bg-transparent'
        )}
        style={{ backgroundColor: !isScrolled ? bannerColor : undefined }}
      >
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold text-skyblue tracking-tighter">
            ALPHA<span className="text-gold">FLIX</span>
          </h1>
          
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-5">
          <button className="text-white/80 hover:text-white transition-colors">
            <Search size={22} />
          </button>
          <button className="text-white/80 hover:text-white transition-colors">
            <Grid size={22} />
          </button>
          <button className="text-white/80 hover:text-white transition-colors">
            <User size={22} />
          </button>
        </div>
      </header>

      {/* Mobile Floating Footer Nav */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#001B3D]/80 backdrop-blur-lg border border-white/10 px-6 py-3 rounded-full flex items-center gap-8 shadow-2xl">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.path}
            className="text-white/60 hover:text-skyblue transition-colors flex flex-col items-center gap-1"
          >
            {item.icon}
            <span className="text-[10px] uppercase tracking-widest">{item.name}</span>
          </a>
        ))}
        <button className="text-white/60 hover:text-skyblue transition-colors flex flex-col items-center gap-1">
          <User size={20} />
          <span className="text-[10px] uppercase tracking-widest">Profile</span>
        </button>
      </nav>
    </>
  );
};

export default Header;
