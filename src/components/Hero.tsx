import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onShopClick: () => void;
  onStoryClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onStoryClick }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-[max(600px,92vh)] overflow-hidden flex items-center px-5 md:px-20 py-24 md:py-32"
    >
      {/* Authentic Original Banner Background */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-[70%_30%] will-change-transform"
        src="/assets/hero-bg.mp4"
        poster="/assets/hero-bg.jpg"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Atmospheric Multi-stop Gradient Overlays (100% GPU composited, zero CPU overhead) */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,10,10,0.94)_0%,rgba(11,10,10,0.78)_30%,rgba(11,10,10,0.15)_60%),linear-gradient(0deg,#0b0a0a_0%,rgba(11,10,10,0)_30%),linear-gradient(180deg,rgba(11,10,10,0.65)_0%,rgba(11,10,10,0)_20%)] pointer-events-none z-[1]" />

      {/* Subtle Ambient Crimson Depth Light (Pure CSS radial glow) */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(179,38,43,0.18)_0%,transparent_70%)] pointer-events-none blur-3xl z-[2]" />

      {/* Hero Content & Typography */}
      <div
        className={`relative max-w-[640px] z-10 transition-all duration-700 ease-out ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="inline-flex items-center gap-2 text-xs tracking-[0.32em] uppercase text-[#b7aea3] mb-5 font-sans font-medium bg-[#0b0a0a]/60 backdrop-blur-sm px-3 py-1 border border-[rgba(232,224,212,0.12)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#b3262b] animate-pulse" />
          <span>Forged in darkness</span>
        </div>

        <h1 className="font-serif text-[clamp(42px,6.5vw,90px)] leading-[1.01] mb-6 tracking-[0.02em] text-[#e8e0d4] text-balance">
          Create your own kingdom
        </h1>

        <p className="text-[clamp(16px,1.5vw,20px)] leading-relaxed text-[#d6cdc1] mb-9 max-w-[400px] font-light">
          Darkness forged. Strength earned. Kingdom chosen.
        </p>

        {/* Action Buttons with High-End Hover Effects */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={onShopClick}
            className="ao-btn ao-btn-primary group"
          >
            <span>Shop Drop I</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>

          <button
            onClick={onStoryClick}
            className="ao-btn ao-btn-outline group"
          >
            <span>Discover the story</span>
            <Sparkles className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 text-[#b3262b] transition-transform group-hover:rotate-12" />
          </button>
        </div>
      </div>

      {/* Live Drop Badge */}
      <div className="absolute right-[clamp(20px,4vw,56px)] bottom-10 whitespace-nowrap flex items-center gap-2.5 text-[11px] font-medium tracking-[0.24em] uppercase text-white bg-[#0b0a0a]/75 rounded-full backdrop-blur-md px-4 py-2 border border-[rgba(232,224,212,0.2)] shadow-lg z-10">
        <span className="w-2 h-2 rounded-full bg-[#e0343a] shadow-[0_0_12px_#e0343a]" />
        <span>Drop I</span>
        <span className="w-3.5 h-[1px] bg-white/50" />
        <span>Now live</span>
      </div>
    </section>
  );
};
