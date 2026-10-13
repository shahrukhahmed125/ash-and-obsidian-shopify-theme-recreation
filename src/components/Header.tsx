import React, { useEffect, useState } from 'react';
import { Search, User, ShoppingBag } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenModal: (name: string) => void;
  onNavigate: (id: string) => void;
  theme: 'dark' | 'light';
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenModal,
  onNavigate,
  theme,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const isLight = theme === 'light';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className={`py-2.5 px-4 text-center border-b transition-colors duration-300 ${
        isLight
          ? 'bg-[#eae4d7] border-[#d8d1c2] text-[#332f29]'
          : 'bg-[#100e0e] border-[rgba(232,224,212,0.1)] text-[#d6cdc1]'
      }`}>
        <div className="flex justify-center items-center gap-4 md:gap-8 text-[10px] md:text-[11px] tracking-[0.24em] uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b3262b] animate-ping" />
            Drop I Now Live &mdash; Complimentary shipping over $100
          </span>
          <span className={`hidden md:inline ${isLight ? 'text-[#a8a192]' : 'text-[rgba(232,224,212,0.3)]'}`}>&bull;</span>
          <span className={`hidden md:inline ${isLight ? 'text-[#635c51]' : 'text-[#9a928a]'}`}>Forged In Darkness</span>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 left-0 right-0 z-40 h-[84px] grid grid-cols-[1fr_auto_1fr] items-center px-4 md:px-12 transition-all duration-400 backdrop-blur-md ${
          scrolled
            ? isLight
              ? 'bg-[#f7f5ef]/95 border-b border-[#ded7c8] shadow-[0_10px_30px_rgba(0,0,0,0.06)]'
              : 'bg-[#0b0a0a]/92 border-b border-[rgba(232,224,212,0.15)] shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : isLight
              ? 'bg-[#f7f5ef]/80 border-b border-[#e5dfd2]'
              : 'bg-[#0b0a0a]/75 border-b border-[rgba(232,224,212,0.08)]'
        }`}
      >
        {/* Navigation */}
        <nav
          className="flex items-center gap-3 sm:gap-6 md:gap-8 text-[11px] tracking-[0.2em] uppercase font-sans"
          aria-label="Store navigation"
        >
          <button
            onClick={() => onNavigate('shop')}
            className={`transition-all text-left relative group py-1 ${
              isLight ? 'text-[#332f29] hover:text-[#0b0a0a]' : 'text-[#e8e0d4] opacity-80 hover:opacity-100 hover:text-white'
            }`}
          >
            <span>Shop</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#b3262b] transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => onNavigate('collections')}
            className={`transition-all text-left relative group py-1 ${
              isLight ? 'text-[#332f29] hover:text-[#0b0a0a]' : 'text-[#e8e0d4] opacity-80 hover:opacity-100 hover:text-white'
            }`}
          >
            <span>Collections</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#b3262b] transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`transition-all text-left relative group py-1 hidden sm:inline-block ${
              isLight ? 'text-[#332f29] hover:text-[#0b0a0a]' : 'text-[#e8e0d4] opacity-80 hover:opacity-100 hover:text-white'
            }`}
          >
            <span>About</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#b3262b] transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => onNavigate('faqs')}
            className={`transition-all text-left relative group py-1 ${
              isLight ? 'text-[#332f29] hover:text-[#0b0a0a]' : 'text-[#e8e0d4] opacity-80 hover:opacity-100 hover:text-white'
            }`}
          >
            <span>FAQs</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#b3262b] transition-all duration-300 group-hover:w-full" />
          </button>
        </nav>

        {/* Center Logo with Ambient Backlight Shimmer */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center justify-center group relative px-3 py-1"
          aria-label="Ash &amp; Obsidian Home"
        >
          {/* Subtle Backlight Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(179,38,43,0.35)_0%,rgba(232,224,212,0.15)_40%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg pointer-events-none" />

          {/* Logo with Ambient Shimmer */}
          <div className="relative flex items-center gap-2.5">
            <img
              src="/assets/ao-logo.png"
              alt="Ash &amp; Obsidian"
              className={`h-[clamp(36px,4.6vw,56px)] w-auto block transition-all duration-500 group-hover:scale-[1.03] animate-logo-glow ${
                isLight ? 'filter brightness-90 contrast-125' : ''
              }`}
            />
          </div>
        </a>

        {/* Action Icons */}
        <div className="flex justify-end items-center gap-2.5 sm:gap-4 md:gap-5">
          <button
            onClick={onOpenSearch}
            aria-label="Search items"
            className={`p-2 transition-colors relative group ${
              isLight ? 'text-[#332f29] hover:text-[#0b0a0a]' : 'text-[#e8e0d4] hover:text-white'
            }`}
          >
            <Search className="w-[18px] h-[18px] stroke-[1.5] transition-transform group-hover:scale-110" />
          </button>

          <button
            onClick={() => onOpenModal('account')}
            aria-label="User account"
            className={`p-2 transition-colors relative group ${
              isLight ? 'text-[#332f29] hover:text-[#0b0a0a]' : 'text-[#e8e0d4] hover:text-white'
            }`}
          >
            <User className="w-[18px] h-[18px] stroke-[1.5] transition-transform group-hover:scale-110" />
          </button>

          <button
            onClick={onOpenCart}
            aria-label="Shopping bag"
            className={`p-2 transition-colors relative group ${
              isLight ? 'text-[#332f29] hover:text-[#0b0a0a]' : 'text-[#e8e0d4] hover:text-white'
            }`}
          >
            <ShoppingBag className="w-[18px] h-[18px] stroke-[1.5] transition-transform group-hover:scale-110" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 rounded-full bg-[#8e1b1f] text-white text-[10px] font-sans font-medium flex items-center justify-center px-1 shadow-[0_0_8px_#b3262b]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>
    </>
  );
};
