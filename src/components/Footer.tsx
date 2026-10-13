import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (id: string) => void;
  onOpenDetails: () => void;
  onToast: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenDetails,
  onToast,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^\S+@\S+\.\S+$/.test(email)) {
      setSubscribed(true);
      setError(false);
      onToast('Welcome to the inner circle.');
    } else {
      setError(true);
    }
  };

  return (
    <footer
      id="footer"
      className="border-t border-[rgba(232,224,212,0.12)] pt-14 pb-8 px-5 md:px-12 bg-[#0b0a0a]"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Col */}
        <div className="flex flex-col gap-4.5">
          <img
            src="/assets/ao-logo.png"
            alt="Ash &amp; Obsidian"
            className="w-72 max-w-full block"
          />
          <div className="font-serif text-xs tracking-[0.24em] uppercase text-[#d6cdc1]">
            Create your own kingdom
          </div>
        </div>

        {/* Shop Col */}
        <div className="flex flex-col gap-2.5 text-sm">
          <div className="text-[11px] tracking-[0.24em] uppercase mb-1.5 text-[#e8e0d4] font-medium">
            Shop
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-left text-[#b7aea3] hover:text-white transition-colors"
          >
            All Products
          </button>
          <button
            onClick={() => onNavigate('collections')}
            className="text-left text-[#b7aea3] hover:text-white transition-colors"
          >
            Men
          </button>
          <button
            onClick={() => onNavigate('collections')}
            className="text-left text-[#b7aea3] hover:text-white transition-colors"
          >
            Women
          </button>
          <button
            onClick={() => onNavigate('collections')}
            className="text-left text-[#b7aea3] hover:text-white transition-colors"
          >
            Unisex
          </button>
          <button
            onClick={() => onNavigate('collections')}
            className="text-left text-[#b7aea3] hover:text-white transition-colors"
          >
            Collections
          </button>
        </div>

        {/* About Col */}
        <div className="flex flex-col gap-2.5 text-sm">
          <div className="text-[11px] tracking-[0.24em] uppercase mb-1.5 text-[#e8e0d4] font-medium">
            About
          </div>
          <button
            onClick={() => onNavigate('about')}
            className="text-left text-[#b7aea3] hover:text-white transition-colors"
          >
            Our Story
          </button>
          <button
            onClick={() => onNavigate('symbols')}
            className="text-left text-[#b7aea3] hover:text-white transition-colors"
          >
            The Seven Symbols
          </button>
          <button
            onClick={() => onToast('Garment-dyed small batch ethical production')}
            className="text-left text-[#b7aea3] hover:text-white transition-colors"
          >
            Sustainability
          </button>
          <button
            onClick={onOpenDetails}
            className="text-left text-[#b7aea3] hover:text-white transition-colors"
          >
            Size Guide
          </button>
          <button
            onClick={() => onToast('concierge@ashandobsidian.com')}
            className="text-left text-[#b7aea3] hover:text-white transition-colors"
          >
            Contact
          </button>
        </div>

        {/* Newsletter Col */}
        <div className="flex flex-col gap-3.5">
          <div className="text-[11px] tracking-[0.24em] uppercase text-[#e8e0d4] font-medium">
            Join the kingdom
          </div>
          <p className="text-xs text-[#b7aea3] leading-relaxed m-0 font-light">
            Be first to know about new drops, secret releases and private events.
          </p>

          {subscribed ? (
            <div className="flex items-center gap-2 text-xs text-[#e8e0d4] bg-[#141212] border border-[rgba(232,224,212,0.2)] p-2.5">
              <Check className="w-3.5 h-3.5 text-[#b3262b]" />
              <span>You have entered the circle.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex mt-1">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(false);
                }}
                placeholder="Enter your email"
                className={`flex-1 bg-transparent border-0 border-b text-xs text-[#e8e0d4] py-2 focus:outline-none placeholder:text-[#9a928a] transition-colors ${
                  error ? 'border-[#b3262b]' : 'border-[rgba(232,224,212,0.3)] focus:border-[#b3262b]'
                }`}
              />
              <button
                type="submit"
                className="text-xs tracking-[0.2em] uppercase text-[#e8e0d4] hover:text-white pl-3 border-b border-[rgba(232,224,212,0.3)] flex items-center gap-1"
              >
                <span>Join</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </form>
          )}

          <div className="flex gap-4 mt-3 text-xs tracking-wider uppercase">
            <button
              onClick={() => onToast('@ashandobsidian on Instagram')}
              className="text-[#b7aea3] hover:text-white transition-colors"
            >
              Instagram
            </button>
            <button
              onClick={() => onToast('@ashandobsidian on TikTok')}
              className="text-[#b7aea3] hover:text-white transition-colors"
            >
              TikTok
            </button>
            <button
              onClick={() => onToast('Ash & Obsidian YouTube')}
              className="text-[#b7aea3] hover:text-white transition-colors"
            >
              YouTube
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Legal Row */}
      <div className="mt-14 pt-6 border-t border-[rgba(232,224,212,0.12)] flex flex-wrap justify-between gap-4 text-xs text-[#8a837b]">
        <div>&copy; 2026 Ash &amp; Obsidian. All rights reserved.</div>
        <div className="flex flex-wrap gap-6">
          <button
            onClick={() => onToast('Strict client privacy. No tracking.')}
            className="text-[#8a837b] hover:text-[#e8e0d4] transition-colors"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => onToast('Complimentary global shipping over $100.')}
            className="text-[#8a837b] hover:text-[#e8e0d4] transition-colors"
          >
            Shipping Policy
          </button>
          <button
            onClick={() => onToast('30-day ritual return policy.')}
            className="text-[#8a837b] hover:text-[#e8e0d4] transition-colors"
          >
            Returns
          </button>
          <button
            onClick={() => onToast('Terms of the Sanctuary.')}
            className="text-[#8a837b] hover:text-[#e8e0d4] transition-colors"
          >
            Terms
          </button>
        </div>
      </div>
    </footer>
  );
};
