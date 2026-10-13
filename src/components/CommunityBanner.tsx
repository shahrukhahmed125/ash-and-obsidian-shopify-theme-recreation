import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CommunityBannerProps {
  onJoinClick: () => void;
}

export const CommunityBanner: React.FC<CommunityBannerProps> = ({ onJoinClick }) => {
  return (
    <section className="relative min-h-[480px] flex items-center justify-end overflow-hidden my-1 px-5 md:px-20 py-20">
      <div
        className="absolute top-0 left-0 bottom-0 w-[min(70%,1100px)] bg-cover bg-[30%_center] no-repeat"
        style={{ backgroundImage: `url('/assets/inner-circle-bg.jpg')` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(270deg,#120909_32%,rgba(18,9,9,0.7)_50%,rgba(11,10,10,0)_72%),radial-gradient(ellipse_at_85%_50%,rgba(122,26,29,0.28),transparent_60%)]" />

      <div className="relative max-w-[460px] text-center flex flex-col items-center gap-5 z-10">
        <div className="flex items-center gap-2.5 text-[#9a928a]">
          <span className="w-14 h-[1px] bg-current" />
          <span className="text-sm">&#10022;</span>
          <span className="w-14 h-[1px] bg-current" />
        </div>

        <h2 className="font-serif text-[clamp(34px,4vw,58px)] leading-tight m-0 text-[#e8e0d4]">
          Built by different kind
        </h2>
        <p className="text-base leading-relaxed text-[#d6cdc1] m-0 font-light">
          A community for those who move differently, think deeper and create their own path.
        </p>

        <button
          onClick={onJoinClick}
          className="ao-btn ao-btn-outline group mt-2"
        >
          <span>Join the inner circle</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
};
