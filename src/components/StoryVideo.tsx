import React from 'react';
import { ArrowRight } from 'lucide-react';

interface StoryVideoProps {
  onExploreClick: () => void;
}

export const StoryVideo: React.FC<StoryVideoProps> = ({ onExploreClick }) => {
  return (
    <section
      id="about"
      className="relative mt-16 min-h-[540px] flex items-center overflow-hidden px-5 md:px-20 py-24"
    >
      {/* Background Video with Authentic Color Filters */}
      <video
        src="/assets/hero-video.mp4"
        poster="/assets/video-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 right-0 w-full h-full object-cover grayscale-[0.55] sepia-[0.35] contrast-[1.15] brightness-[0.62] saturate-[0.9]"
      />

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,rgba(122,26,29,0.22),rgba(11,10,10,0)_60%)] mix-blend-soft-light pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,10,10,0)_45%,rgba(11,10,10,0.75)_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,10,10,0.92)_0%,rgba(11,10,10,0.7)_30%,rgba(11,10,10,0.15)_60%,rgba(11,10,10,0)_80%),linear-gradient(0deg,rgba(11,10,10,0.6),rgba(11,10,10,0)_30%)]" />

      {/* Content */}
      <div className="relative max-w-[480px] z-10">
        <div className="text-xs tracking-[0.3em] uppercase text-[#b7aea3] mb-4 font-sans font-medium">
          More than clothing
        </div>
        <h2 className="font-serif text-[clamp(38px,5vw,72px)] leading-none mb-5.5 tracking-[0.02em] text-[#e8e0d4]">
          A state of mind
        </h2>
        <p className="text-[17px] leading-relaxed text-[#d6cdc1] mb-8 font-light">
          For those who stand apart. A collection built on symbols, stories and strength.
        </p>
        <button
          onClick={onExploreClick}
          className="ao-btn ao-btn-outline group"
        >
          <span>Explore the collection</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
};
