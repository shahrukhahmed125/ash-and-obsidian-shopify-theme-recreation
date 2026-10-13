import React, { useEffect, useState } from 'react';

export const Preloader: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070606] transition-all duration-700 ease-out ${
        loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background celestial moon halo */}
      <div className="absolute w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(179,38,43,0.25)_0%,rgba(232,224,212,0.1)_40%,transparent_70%)] blur-2xl animate-pulse" />

      <div className="relative flex flex-col items-center z-10">
        {/* Animated logo with crimson shadow */}
        <div className="relative mb-5">
          <img
            src="/assets/ao-logo.png"
            alt="Ash &amp; Obsidian"
            className="h-12 w-auto opacity-95 animate-logo-glow"
          />
        </div>

        <div className="font-serif text-xs tracking-[0.34em] uppercase text-[#d6cdc1] mb-5">
          Forged In Darkness
        </div>

        {/* Shimmering Progress Bar */}
        <div className="w-48 h-[2px] bg-[rgba(232,224,212,0.12)] overflow-hidden relative shadow-[0_0_10px_rgba(179,38,43,0.5)]">
          <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-[#7a1a1d] via-[#b3262b] to-[#e8e0d4] animate-[marquee_1.2s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
};
