import React, { useState } from 'react';
import { PRODUCTS, COLORS, Product } from '../data/storeData';
import { Plus } from 'lucide-react';

interface FeaturedProductsProps {
  activeCategory: string;
  onFilterChange: (cat: string) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  activeCategory,
  onFilterChange,
  onAddToCart,
}) => {
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
  const [sizeOpenProduct, setSizeOpenProduct] = useState<string | null>(null);

  const filteredProducts = PRODUCTS.filter(
    (p) => activeCategory === 'All' || p.cats.includes(activeCategory)
  );

  const handleColorChange = (productId: string, colorKey: string) => {
    setSelectedColors((prev) => ({ ...prev, [productId]: colorKey }));
  };

  const getColor = (p: Product) => {
    return selectedColors[p.id] || p.colors[0];
  };

  const handleQuickAdd = (p: Product, size: string) => {
    const color = getColor(p);
    onAddToCart(p, size, color);
    setSizeOpenProduct(null);
  };

  return (
    <section id="shop" className="py-16 md:py-24 px-4 md:px-12">
      {/* Header & Filter Controls */}
      <div className="flex flex-wrap justify-between items-end gap-5 mb-9">
        <div>
          <div className="text-[11px] tracking-[0.3em] uppercase text-[#9a928a] mb-2 font-medium">
            Drop I
          </div>
          <h2 className="font-serif text-[clamp(34px,4vw,56px)] tracking-[0.03em] m-0 text-[#e8e0d4]">
            Bestsellers
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          {['All', 'Men', 'Women', 'Unisex'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                onFilterChange(cat);
                setSizeOpenProduct(null);
              }}
              className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-[#e8e0d4] text-[#0b0a0a] border-[#e8e0d4] font-medium shadow-[0_0_15px_rgba(232,224,212,0.3)]'
                  : 'bg-transparent text-[#e8e0d4] border-[rgba(232,224,212,0.35)] hover:border-[#b3262b] hover:bg-[#b3262b]/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((p) => {
          const currentColorKey = getColor(p);
          const colorDef = COLORS[currentColorKey];
          const isSizeOpen = sizeOpenProduct === p.id;

          return (
            <div
              key={p.id}
              className="group flex flex-col gap-3 relative transition-all duration-300"
            >
              {/* Product Image Frame */}
              <div className="relative aspect-square overflow-hidden bg-[#161413] border border-transparent group-hover:border-[#b3262b]/50 transition-colors duration-500 shadow-lg">
                <img
                  src={p.img}
                  alt={p.name}
                  draggable="false"
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.6,0.2,1)] group-hover:scale-105"
                  style={{ filter: colorDef.filter }}
                />

                {/* Subtle Image Shimmer Highlight */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Color Swatches Overlay on Image Bottom */}
                <div className="absolute bottom-3 left-3 flex gap-1.5 p-1 bg-[#0b0a0a]/80 backdrop-blur-md rounded-full border border-[rgba(232,224,212,0.15)] shadow-md">
                  {p.colors.map((cKey) => {
                    const c = COLORS[cKey];
                    const active = cKey === currentColorKey;
                    return (
                      <button
                        key={cKey}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleColorChange(p.id, cKey);
                        }}
                        title={c.name}
                        className={`w-4 h-4 rounded-full transition-transform ${
                          active
                            ? 'scale-110 ring-1 ring-[#e8e0d4] ring-offset-1 ring-offset-[#0b0a0a]'
                            : 'opacity-70 hover:opacity-100 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    );
                  })}
                </div>

                {/* Size Selector Flyout Overlay */}
                {isSizeOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute inset-0 bg-[#0b0a0a]/92 backdrop-blur-md flex flex-col justify-center items-center gap-3 p-4 z-20 animate-in fade-in zoom-in-95 duration-200"
                  >
                    <div className="text-[11px] tracking-[0.2em] uppercase text-[#b7aea3]">
                      Select Size ({colorDef.name})
                    </div>
                    <div className="flex gap-2">
                      {['S', 'M', 'L', 'XL'].map((size) => (
                        <button
                          key={size}
                          onClick={() => handleQuickAdd(p, size)}
                          className="w-9 h-9 border border-[rgba(232,224,212,0.35)] text-xs text-[#e8e0d4] hover:bg-[#e8e0d4] hover:text-[#0b0a0a] transition-all hover:scale-105"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setSizeOpenProduct(null)}
                      className="text-[10px] tracking-wider uppercase text-[#9a928a] hover:text-white underline mt-2"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Title, Price and Quick Add */}
              <div className="flex justify-between items-start pt-1">
                <div>
                  <h3 className="text-xs tracking-[0.14em] uppercase text-[#e8e0d4] m-0 font-normal group-hover:text-white transition-colors">
                    {p.name}
                  </h3>
                  <div className="text-sm text-[#d6cdc1] mt-1 font-light">
                    ${p.price.toFixed(2)}
                  </div>
                </div>

                <button
                  onClick={() => setSizeOpenProduct(isSizeOpen ? null : p.id)}
                  aria-label="Quick add size"
                  className={`w-8 h-8 rounded-full border border-[rgba(232,224,212,0.45)] flex items-center justify-center text-[#e8e0d4] hover:bg-[#e8e0d4] hover:text-[#0b0a0a] hover:shadow-[0_0_12px_rgba(232,224,212,0.4)] transition-all duration-300 ${
                    isSizeOpen ? 'rotate-45 bg-[#b3262b] border-[#b3262b] text-white shadow-[0_0_12px_#b3262b]' : ''
                  }`}
                >
                  <Plus className="w-4 h-4 stroke-[2]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
