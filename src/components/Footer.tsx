import React from 'react';

const Footer: React.FC = () => {
  const genres = [
    'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Animation', 'Documentary'
  ];

  return (
    <footer className="bg-[#000D1F] pt-16 pb-32 md:pb-16 px-6 md:px-16 border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-bold text-skyblue tracking-tighter mb-6">
            ALPHA<span className="text-gold">FLIX</span>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            Experience the best of global cinema and series in stunning 4K. Your ultimate destination for cinematic entertainment.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white/40 hover:text-skyblue transition-colors cursor-pointer text-xs font-bold uppercase tracking-widest">FB</span>
            <span className="text-white/40 hover:text-skyblue transition-colors cursor-pointer text-xs font-bold uppercase tracking-widest">TW</span>
            <span className="text-white/40 hover:text-skyblue transition-colors cursor-pointer text-xs font-bold uppercase tracking-widest">IG</span>
            <span className="text-white/40 hover:text-skyblue transition-colors cursor-pointer text-xs font-bold uppercase tracking-widest">YT</span>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Browse Genres</h4>
          <div className="grid grid-cols-2 gap-3">
            {genres.map(genre => (
              <a key={genre} href="#" className="text-white/40 hover:text-white text-sm transition-colors">{genre}</a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Support</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-white/40 hover:text-white text-sm transition-colors">Help Center</a></li>
            <li><a href="#" className="text-white/40 hover:text-white text-sm transition-colors">Terms of Service</a></li>
            <li><a href="#" className="text-white/40 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-white/40 hover:text-white text-sm transition-colors">Cookie Preferences</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">AlphaFlix App</h4>
          <p className="text-white/40 text-sm mb-4">Download our app for the best experience on the go.</p>
          <div className="flex flex-col gap-3">
            <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors">
              <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center font-bold">A</div>
              <div>
                <div className="text-[10px] text-white/40 uppercase">Download on</div>
                <div className="text-sm font-bold">App Store</div>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors">
              <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center font-bold">G</div>
              <div>
                <div className="text-[10px] text-white/40 uppercase">Get it on</div>
                <div className="text-sm font-bold">Google Play</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/20 text-xs">© 2026 AlphaFlix Inc. All rights reserved.</p>
        <div className="flex items-center gap-2 text-white/20 text-xs">
          Made with <span className="text-red-500/50">❤️</span> by Manus
        </div>
      </div>
    </footer>
  );
};

export default Footer;
