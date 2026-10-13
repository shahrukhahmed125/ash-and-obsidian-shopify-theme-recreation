import React from 'react';
import { ArrowRight } from 'lucide-react';

interface InstagramFeedProps {
  onFollowClick: () => void;
}

export const InstagramFeed: React.FC<InstagramFeedProps> = ({ onFollowClick }) => {
  const images = [
    '/assets/crafted-new.jpg',
    '/assets/ig2-new.jpg',
    '/assets/ig3-new.jpg',
    '/assets/ig4-new.jpg',
    '/assets/ig5-new.jpg',
    '/assets/ig6-new.jpg',
  ];

  return (
    <section className="py-12 md:py-20 px-4 md:px-8">
      <div className="flex justify-between items-center mb-4.5 px-1">
        <div className="text-xs tracking-[0.2em] uppercase text-[#e8e0d4] font-medium">
          @ashandobsidian
        </div>
        <button
          onClick={onFollowClick}
          className="text-[11px] tracking-[0.2em] uppercase text-[#e8e0d4] border-b border-[rgba(232,224,212,0.5)] pb-1 hover:text-white flex items-center gap-1.5"
        >
          <span>Follow us</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
        {images.map((src, i) => (
          <div
            key={i}
            onClick={onFollowClick}
            className="aspect-[106/124] overflow-hidden bg-[#141212] group cursor-pointer relative"
          >
            <img
              src={src}
              alt="Community garment"
              className="w-full h-full object-cover brightness-[0.85] transition-all duration-700 ease-[cubic-bezier(0.2,0.6,0.2,1)] group-hover:brightness-105 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
