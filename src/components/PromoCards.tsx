import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PromoCardsProps {
  onOpenDetails: () => void;
  onOpenPackaging: () => void;
}

export const PromoCards: React.FC<PromoCardsProps> = ({
  onOpenDetails,
  onOpenPackaging,
}) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-1 px-1">
      {/* Banner 1: Crafted for the real ones */}
      <div className="relative min-h-[380px] overflow-hidden flex items-center p-8 md:p-14">
        <div
          className="absolute top-0 right-0 bottom-0 w-[72%] bg-cover bg-[65%_center] no-repeat transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: `url('/assets/crafted-new.jpg')` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0b0a0a_35%,rgba(11,10,10,0.4)_70%,rgba(11,10,10,0.1))]" />
        <div className="relative max-w-[300px] flex flex-col gap-4.5 items-start z-10">
          <h3 className="font-serif text-[clamp(26px,2.6vw,36px)] leading-tight m-0 text-[#e8e0d4]">
            Crafted for the real ones
          </h3>
          <p className="text-[15px] leading-relaxed text-[#b7aea3] m-0 font-light">
            Premium fabrics. Timeless designs. Built to last.
          </p>
          <button
            onClick={onOpenDetails}
            className="ao-btn ao-btn-outline group"
          >
            <span>The details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Banner 2: More than the garment */}
      <div className="relative min-h-[380px] overflow-hidden flex items-center p-8 md:p-14">
        <div
          className="absolute top-0 right-0 bottom-0 w-[72%] bg-cover bg-[70%_center] no-repeat transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: `url('/assets/packaging-box.jpg')` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0b0a0a_40%,rgba(11,10,10,0.4)_70%,rgba(11,10,10,0.1))]" />
        <div className="relative max-w-[300px] flex flex-col gap-4.5 items-start z-10">
          <h3 className="font-serif text-[clamp(26px,2.6vw,36px)] leading-tight m-0 text-[#e8e0d4]">
            More than the garment
          </h3>
          <p className="text-[15px] leading-relaxed text-[#b7aea3] m-0 font-light">
            Every order comes with a piece of the kingdom. Custom packaging, lore card and collectible symbol card.
          </p>
          <button
            onClick={onOpenPackaging}
            className="ao-btn ao-btn-outline group"
          >
            <span>The packaging</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
