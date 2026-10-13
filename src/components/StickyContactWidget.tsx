import React, { useState } from 'react';
import { Phone, MessageCircle, X, Headphones, Clock, ArrowUpRight, Copy, Check } from 'lucide-react';

interface StickyContactWidgetProps {
  isLight?: boolean;
  onToast: (msg: string) => void;
}

export const StickyContactWidget: React.FC<StickyContactWidgetProps> = ({ isLight = false, onToast }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const WHATSAPP_NUMBER = '+1 (800) 274-6274';
  const WHATSAPP_LINK = 'https://wa.me/18002746274?text=Hello%20Ash%20%26%20Obsidian%20Concierge%2C%20I%20have%20an%20inquiry%20regarding%20Drop%20I.';
  const CALL_NUMBER = 'tel:+18002746274';

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('+18002746274');
    setCopied(true);
    onToast('Concierge number copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Expanded Quick Concierge Card */}
      {isOpen && (
        <div className={`w-80 p-5 rounded-sm border shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-300 ${
          isLight
            ? 'bg-[#ede8dc]/95 border-[#d6cfbe] text-[#141212]'
            : 'bg-[#121010]/95 border-[rgba(232,224,212,0.18)] text-[#e8e0d4]'
        }`}>
          {/* Card Header */}
          <div className="flex justify-between items-start mb-3 pb-3 border-b border-current/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#b3262b]/15 border border-[#b3262b]/40 flex items-center justify-center text-[#b3262b]">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <div className="font-serif text-sm font-medium tracking-wide">
                  Sanctuary Concierge
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#22c55e]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-ping" />
                  <span>Online &middot; Avg reply 2 min</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:opacity-75 transition-opacity"
              aria-label="Close concierge card"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs font-light leading-relaxed mb-4 opacity-80">
            Speak with our private stylists for bespoke sizing advice, order adjustments, and drop allocations.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            {/* WhatsApp Chat Button */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onToast('Opening WhatsApp Concierge...')}
              className="flex items-center justify-between p-3 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] transition-all duration-200 group rounded-sm"
            >
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 fill-[#25D366]" />
                <span className="text-xs font-medium tracking-wide">Chat on WhatsApp</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Direct Call Button */}
            <a
              href={CALL_NUMBER}
              onClick={() => onToast('Calling Direct Line Concierge...')}
              className={`flex items-center justify-between p-3 border transition-all duration-200 group rounded-sm ${
                isLight
                  ? 'bg-black/5 hover:bg-black/10 border-black/15 text-[#141212]'
                  : 'bg-white/5 hover:bg-white/10 border-white/15 text-[#e8e0d4]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#b3262b]" />
                <span className="text-xs font-medium tracking-wide">Call Direct Line</span>
              </div>
              <span className="text-[10px] opacity-70 font-mono">Toll-Free</span>
            </a>
          </div>

          {/* Footer Info */}
          <div className="mt-3 pt-2.5 border-t border-current/10 flex justify-between items-center text-[10px] opacity-75">
            <div className="flex items-center gap-1 font-mono">
              <span>{WHATSAPP_NUMBER}</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 hover:underline text-[#b3262b]"
            >
              {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Sticky Pills */}
      <div className="flex items-center gap-2">
        {/* Direct WhatsApp Quick Floating Button */}
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp"
          className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-[#25D366]/40 transition-all duration-300 relative group"
        >
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping" />
          </span>
          {/* Tooltip */}
          <div className="absolute right-full mr-3 px-2.5 py-1 bg-[#100e0e] text-[#e8e0d4] text-[10px] tracking-wider uppercase whitespace-nowrap rounded border border-[rgba(232,224,212,0.2)] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
            WhatsApp Concierge
          </div>
        </a>

        {/* Direct Phone Call Floating Button */}
        <a
          href={CALL_NUMBER}
          title="Direct Phone Line"
          className="w-12 h-12 rounded-full bg-[#b3262b] text-white flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-[#b3262b]/50 transition-all duration-300 relative group"
        >
          <Phone className="w-5 h-5 fill-white" />
          {/* Tooltip */}
          <div className="absolute right-full mr-3 px-2.5 py-1 bg-[#100e0e] text-[#e8e0d4] text-[10px] tracking-wider uppercase whitespace-nowrap rounded border border-[rgba(232,224,212,0.2)] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
            Direct Line
          </div>
        </a>

        {/* Concierge Dialog Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle concierge options"
          className={`h-12 px-4 rounded-full border shadow-xl flex items-center gap-2 transition-all duration-300 hover:scale-105 ${
            isOpen
              ? 'bg-[#b3262b] border-[#b3262b] text-white'
              : isLight
                ? 'bg-[#141212] text-[#f7f5ef] border-[#141212]'
                : 'bg-[#100e0e] text-[#e8e0d4] border-[rgba(232,224,212,0.3)] hover:border-[#b3262b]'
          }`}
        >
          <Headphones className="w-4 h-4 text-[#b3262b]" />
          <span className="text-xs font-serif tracking-wider font-medium hidden sm:inline">
            Concierge
          </span>
          <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
        </button>
      </div>
    </div>
  );
};
