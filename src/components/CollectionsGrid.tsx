import React, { useState } from 'react';
import { SlidersHorizontal, RotateCcw, Check } from 'lucide-react';

interface CollectionsGridProps {
  onSelectCategory: (cat: string) => void;
}

interface FrameState {
  x: number;
  y: number;
  z: number;
}

export const CollectionsGrid: React.FC<CollectionsGridProps> = ({
  onSelectCategory,
}) => {
  const [frames, setFrames] = useState<Record<string, FrameState>>({
    Men: { x: 50, y: 20, z: 1 },
    Women: { x: 50, y: 20, z: 1 },
    Unisex: { x: 50, y: 20, z: 1 },
  });
  const [adjusting, setAdjusting] = useState<string | null>(null);

  const categories = [
    { name: 'Men', img: '/assets/men-collection.jpg' },
    { name: 'Women', img: '/assets/women-collection.jpg' },
    { name: 'Unisex', img: '/assets/unisex-collection.jpg' },
  ];

  const handleZoom = (name: string, val: number) => {
    setFrames((prev) => ({
      ...prev,
      [name]: { ...prev[name], z: val },
    }));
  };

  const handleReset = (name: string) => {
    setFrames((prev) => ({
      ...prev,
      [name]: { x: 50, y: 20, z: 1 },
    }));
  };

  return (
    <section
      id="collections"
      className="pt-6 px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4.5"
    >
      {categories.map((c) => {
        const frame = frames[c.name] || { x: 50, y: 20, z: 1 };
        const isAdj = adjusting === c.name;

        return (
          <div
            key={c.name}
            onClick={() => {
              if (!isAdj && !adjusting) onSelectCategory(c.name);
            }}
            className={`relative aspect-[1/1.02] overflow-hidden bg-[#141212] group user-select-none transition-all duration-300 ${
              isAdj
                ? 'ring-1 ring-[#b3262b] cursor-grab'
                : 'cursor-pointer hover:shadow-2xl'
            }`}
          >
            {/* Image with zoom and focal position */}
            <div
              className="absolute inset-0 transition-transform duration-700 ease-out"
              style={{
                transform: `scale(${frame.z})`,
                transformOrigin: `${frame.x}% ${frame.y}%`,
              }}
            >
              <img
                src={c.img}
                alt={c.name}
                draggable="false"
                className={`w-full h-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.2,0.6,0.2,1)] ${
                  isAdj
                    ? 'brightness-100'
                    : 'brightness-[0.8] group-hover:brightness-95 group-hover:scale-105'
                }`}
                style={{ objectPosition: `${frame.x}% ${frame.y}%` }}
              />
            </div>

            {/* Gradient Overlay & Text */}
            <div
              className={`absolute inset-0 pointer-events-none bg-[linear-gradient(0deg,rgba(11,10,10,0.85)_0%,rgba(11,10,10,0)_50%)] flex flex-col justify-end items-center pb-7 gap-2 transition-opacity duration-300 ${
                isAdj ? 'opacity-25' : 'opacity-100'
              }`}
            >
              <h2 className="font-serif text-[clamp(26px,2.6vw,36px)] tracking-[0.06em] uppercase text-[#e8e0d4] m-0">
                {{ Men: 'Men', Women: 'Women', Unisex: 'Unisex' }[c.name]}
              </h2>
              <div className="text-xs tracking-[0.14em] text-[#d6cdc1]">
                Explore &rarr;
              </div>
            </div>

            {/* Adjust Button */}
            {!isAdj && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setAdjusting(c.name);
                }}
                title="Adjust banner framing"
                className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#0b0a0a]/60 backdrop-blur-md border border-[rgba(232,224,212,0.25)] text-[#e8e0d4] px-2.5 py-1.5 text-[10px] tracking-[0.2em] uppercase hover:bg-[#0b0a0a]/85 transition-colors opacity-0 group-hover:opacity-100"
              >
                <SlidersHorizontal className="w-3 h-3" />
                Adjust
              </button>
            )}

            {/* Adjust Controls Bar */}
            {isAdj && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute left-3 right-3 bottom-3 flex items-center gap-3 bg-[#0b0a0a]/85 backdrop-blur-md border border-[rgba(232,224,212,0.2)] p-2.5 z-20"
              >
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#9a928a]">
                  Zoom
                </span>
                <input
                  type="range"
                  min="1"
                  max="2"
                  step="0.02"
                  value={frame.z}
                  onChange={(e) => handleZoom(c.name, parseFloat(e.target.value))}
                  className="flex-1 min-w-0 accent-[#b3262b] cursor-pointer"
                />
                <button
                  onClick={() => handleReset(c.name)}
                  className="text-[10px] tracking-[0.16em] uppercase text-[#e8e0d4] border border-[rgba(232,224,212,0.3)] px-2 py-1 flex items-center gap-1 hover:border-[#e8e0d4]"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  Reset
                </button>
                <button
                  onClick={() => setAdjusting(null)}
                  className="text-[10px] tracking-[0.16em] uppercase bg-[#e8e0d4] text-[#0b0a0a] px-2.5 py-1 flex items-center gap-1 font-medium hover:bg-white"
                >
                  <Check className="w-3 h-3" />
                  Done
                </button>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};
