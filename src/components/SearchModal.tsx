import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS, Product } from '../data/storeData';
import { X, Search } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (p: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = PRODUCTS.filter((p) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.cats.some((c) => c.toLowerCase().includes(q)) ||
      p.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-60 bg-[#0b0a0a]/98 p-6 md:p-16 overflow-y-auto animate-in fade-in duration-200">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="text-xs tracking-[0.3em] uppercase text-[#9a928a]">
            Search the kingdom
          </div>
          <button
            onClick={onClose}
            aria-label="Close search"
            className="text-2xl text-[#e8e0d4] hover:text-white p-2"
          >
            <X className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>

        {/* Input */}
        <div className="relative mb-6">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pomegranate, hoodie, crown, tee…"
            className="w-full bg-transparent border-0 border-b border-[rgba(232,224,212,0.35)] text-[#e8e0d4] font-serif text-2xl md:text-4xl py-3 focus:outline-none focus:border-[#b3262b] placeholder:text-[rgba(232,224,212,0.25)] transition-colors"
          />
        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap gap-2 text-xs text-[#9a928a] tracking-wider mb-8">
          <span>Popular:</span>
          {['Obsidian', 'Hoodie', 'Crown', 'Thorn', 'Crop', 'Unisex'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="text-[#e8e0d4] hover:text-[#b3262b] underline"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results */}
        {query.trim() && (
          <div className="mb-4 text-xs text-[#9a928a] tracking-[0.1em]">
            {results.length} {results.length === 1 ? 'result found' : 'results found'}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {results.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                onSelectProduct(p);
                onClose();
              }}
              className="cursor-pointer group flex flex-col gap-2.5"
            >
              <div className="aspect-square bg-[#161413] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="text-xs tracking-[0.14em] uppercase text-[#e8e0d4] group-hover:text-white truncate">
                {p.name}
              </div>
              <div className="text-xs text-[#b7aea3]">${p.price.toFixed(2)}</div>
            </div>
          ))}
        </div>

        {query.trim() && results.length === 0 && (
          <div className="py-12 text-center text-[#9a928a] font-light">
            No garments matching &ldquo;{query}&rdquo; were found in this drop.
          </div>
        )}
      </div>
    </div>
  );
};
