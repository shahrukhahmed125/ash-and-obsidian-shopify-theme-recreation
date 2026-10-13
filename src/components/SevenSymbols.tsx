import React, { useState } from 'react';
import { SYMBOLS } from '../data/storeData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const SevenSymbols: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const active = SYMBOLS[activeIdx];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + SYMBOLS.length) % SYMBOLS.length);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % SYMBOLS.length);
  };

  return (
    <section id="symbols" className="py-16 md:py-28 px-4 md:px-12">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
        <div>
          <h2 className="font-serif text-[clamp(28px,3vw,42px)] m-0 mb-2.5 tracking-[0.04em] text-[#e8e0d4]">
            The Seven Symbols
          </h2>
          <div className="text-xs tracking-[0.2em] uppercase text-[#9a928a]">
            Some paths are chosen for us. Others, we choose ourselves.
          </div>
        </div>
        <div className="text-[11px] tracking-[0.2em] uppercase text-[#9a928a]">
          Select a symbol
        </div>
      </div>

      {/* 7 Horizontal Buttons Grid */}
      <div className="grid grid-cols-7 gap-2.5 overflow-x-auto pb-3 scrollbar-thin">
        {SYMBOLS.map((s, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={s.name}
              onClick={() => setActiveIdx(idx)}
              className={`p-3 md:p-4.5 flex flex-col items-center gap-3 text-center transition-all duration-300 border min-w-[100px] ${
                isActive
                  ? 'bg-[#1a1414] border-[#b3262b] -translate-y-1 shadow-[0_4px_20px_rgba(179,38,43,0.25)]'
                  : 'bg-[#0f0d0d] border-[rgba(232,224,212,0.15)] hover:border-[rgba(232,224,212,0.45)]'
              }`}
            >
              <img
                src={s.img}
                alt={s.name}
                className="w-full aspect-[86/115] object-contain block transition-transform duration-300 hover:scale-105"
              />
              <div className="font-serif text-[clamp(11px,1vw,13px)] tracking-[0.08em] uppercase leading-tight text-[#e8e0d4]">
                The {s.name}
              </div>
              <div className="text-[12px] text-[#9a928a] leading-tight line-clamp-1">
                {s.meaning}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Symbol Display Box */}
      <div className="mt-6 border border-[rgba(232,224,212,0.15)] bg-[#110f0f] grid grid-cols-1 md:grid-cols-2">
        <div className="bg-[#0b0a0a] flex items-center justify-center p-8 min-h-[300px]">
          <img
            src={active.img}
            alt={active.name}
            className="h-64 max-w-full object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] transition-all duration-500 animate-in fade-in"
          />
        </div>

        <div className="p-7 md:p-14 flex flex-col justify-center gap-4">
          <div className="text-[11px] tracking-[0.3em] uppercase text-[#b3262b] font-medium">
            Symbol {active.numeral} of VII
          </div>
          <div className="font-serif text-[clamp(28px,3vw,40px)] tracking-[0.04em] text-[#e8e0d4]">
            The {active.name}
          </div>
          <div className="text-[13px] tracking-[0.2em] uppercase text-[#d6cdc1]">
            {active.meaning}
          </div>
          <p className="text-base leading-relaxed text-[#b7aea3] m-0 max-w-[460px] font-light">
            {active.lore}
          </p>

          <div className="flex gap-2.5 mt-2">
            <button
              onClick={handlePrev}
              aria-label="Previous symbol"
              className="w-10 h-10 border border-[rgba(232,224,212,0.35)] flex items-center justify-center text-[#e8e0d4] hover:border-[#e8e0d4] hover:bg-white/5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next symbol"
              className="w-10 h-10 border border-[rgba(232,224,212,0.35)] flex items-center justify-center text-[#e8e0d4] hover:border-[#e8e0d4] hover:bg-white/5 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
