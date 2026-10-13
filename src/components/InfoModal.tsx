import React from 'react';
import { MODAL_DATA } from '../data/storeData';
import { X } from 'lucide-react';

interface InfoModalProps {
  modalKey: string | null;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ modalKey, onClose }) => {
  if (!modalKey) return null;
  const data = MODAL_DATA[modalKey] || MODAL_DATA.details;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-70 bg-black/80 backdrop-blur-sm flex items-center justify-center p-5 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#100e0e] border border-[rgba(232,224,212,0.18)] max-w-lg w-full p-8 md:p-11 flex flex-col gap-4 relative shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-5 text-2xl text-[#e8e0d4] hover:text-white"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        <div className="text-[11px] tracking-[0.3em] uppercase text-[#b3262b] font-medium">
          {data.kicker}
        </div>

        <div className="font-serif text-2xl md:text-3xl text-[#e8e0d4] tracking-[0.04em]">
          {data.title}
        </div>

        <div className="flex flex-col gap-3.5 pt-2">
          {data.lines.map((ln, idx) => (
            <div
              key={idx}
              className="flex gap-3.5 text-sm md:text-[15px] text-[#d6cdc1] border-t border-[rgba(232,224,212,0.1)] pt-3.5 leading-relaxed font-light"
            >
              <span className="text-[#9a928a] select-none">&#10022;</span>
              <span>{ln}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
