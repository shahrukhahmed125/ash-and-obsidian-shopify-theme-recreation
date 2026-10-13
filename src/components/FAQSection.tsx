import React, { useState } from 'react';
import { FAQS } from '../data/storeData';
import { Plus, Minus, HelpCircle, MessageSquare } from 'lucide-react';

interface FAQSectionProps {
  onContactClick: () => void;
  isLight?: boolean;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onContactClick, isLight = false }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']);

  const categories = ['All', 'Orders & Shipping', 'Garments & Fit', 'Rituals & Lore'];

  const filteredFaqs = FAQS.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  );

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faqs" className={`py-16 md:py-24 px-4 md:px-12 border-t transition-colors duration-300 ${
      isLight ? 'bg-[#f7f5ef] border-[#e2ddd3] text-[#141212]' : 'bg-[#0b0a0a] border-[rgba(232,224,212,0.12)] text-[#e8e0d4]'
    }`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#b3262b] font-medium mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>The Inquiries</span>
          </div>
          <h2 className="font-serif text-[clamp(30px,3.8vw,52px)] tracking-[0.03em] m-0 mb-3.5">
            Frequently Asked Questions
          </h2>
          <p className={`text-sm md:text-base max-w-lg mx-auto m-0 font-light leading-relaxed ${
            isLight ? 'text-[#5a544c]' : 'text-[#b7aea3]'
          }`}>
            Answers from the Sanctuary regarding drops, fitting, craftsmanship, and ritual deliveries.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase transition-all duration-300 border ${
                  activeCategory === cat
                    ? isLight
                      ? 'bg-[#141212] text-[#f7f5ef] border-[#141212] font-medium shadow-md'
                      : 'bg-[#e8e0d4] text-[#0b0a0a] border-[#e8e0d4] font-medium shadow-[0_0_15px_rgba(232,224,212,0.3)]'
                    : isLight
                      ? 'bg-transparent text-[#5a544c] border-[#d8d2c4] hover:border-[#141212]'
                      : 'bg-transparent text-[#e8e0d4] border-[rgba(232,224,212,0.3)] hover:border-[#b3262b] hover:bg-[#b3262b]/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={`border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? isLight
                      ? 'bg-[#ede8dc] border-[#b3262b]/60 shadow-sm'
                      : 'bg-[#121010] border-[#b3262b]/60 shadow-lg'
                    : isLight
                      ? 'bg-[#f0ebe0] border-[#ded7c8] hover:border-[#b3262b]/40'
                      : 'bg-[#0f0d0d] border-[rgba(232,224,212,0.12)] hover:border-[rgba(232,224,212,0.3)]'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 md:p-6 text-left flex justify-between items-center gap-4 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#b3262b] select-none">&#10022;</span>
                    <span className="font-serif text-sm md:text-base tracking-[0.03em] font-normal">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                    isOpen
                      ? 'rotate-180 border-[#b3262b] text-[#b3262b] bg-[#b3262b]/10'
                      : isLight
                        ? 'border-[#ccc5b4] text-[#5a544c]'
                        : 'border-[rgba(232,224,212,0.3)] text-[#e8e0d4]'
                  }`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className={`px-5 md:px-6 pb-6 pt-1 text-sm leading-relaxed font-light border-t ${
                    isLight
                      ? 'border-[#ded7c8] text-[#4d473f]'
                      : 'border-[rgba(232,224,212,0.08)] text-[#d6cdc1]'
                  }`}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Unanswered Question Concierge Callout */}
        <div className={`mt-10 p-6 md:p-8 border flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left ${
          isLight
            ? 'bg-[#ede8dc] border-[#ded7c8]'
            : 'bg-[#110f0f] border-[rgba(232,224,212,0.14)]'
        }`}>
          <div>
            <div className="font-serif text-base tracking-[0.04em] mb-1">
              Have an unanswered question?
            </div>
            <div className={`text-xs ${isLight ? 'text-[#6a6358]' : 'text-[#9a928a]'}`}>
              Our private concierge is available on WhatsApp and Direct Line 24/7.
            </div>
          </div>
          <button
            onClick={onContactClick}
            className="ao-btn ao-btn-primary !py-2.5 !px-5 flex items-center gap-2 text-xs font-medium"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Connect With Concierge &rarr;</span>
          </button>
        </div>
      </div>
    </section>
  );
};
