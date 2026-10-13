import React from 'react';
import { REVIEWS } from '../data/storeData';
import { Star, CheckCircle } from 'lucide-react';

interface CustomerReviewsMarqueeProps {
  isLight?: boolean;
}

export const CustomerReviewsMarquee: React.FC<CustomerReviewsMarqueeProps> = ({ isLight = false }) => {
  const row1Reviews = REVIEWS.filter((r) => r.row === 1);
  const row2Reviews = REVIEWS.filter((r) => r.row === 2);

  // Duplicate items to guarantee a completely seamless infinite loop
  const row1Items = [...row1Reviews, ...row1Reviews, ...row1Reviews];
  const row2Items = [...row2Reviews, ...row2Reviews, ...row2Reviews];

  return (
    <section className={`py-20 md:py-28 border-y overflow-hidden relative transition-colors duration-300 ${
      isLight
        ? 'bg-[#f4efe4] border-[#ded7c8]'
        : 'bg-[#0b0a0a] border-[rgba(232,224,212,0.12)]'
    }`}>
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center px-4 mb-12">
        <div className="text-[11px] tracking-[0.3em] uppercase text-[#b3262b] font-medium mb-3">
          Voices From The Kingdom
        </div>
        <h2 className={`font-serif text-[clamp(30px,4vw,52px)] tracking-[0.03em] m-0 mb-3.5 ${
          isLight ? 'text-[#141212]' : 'text-[#e8e0d4]'
        }`}>
          Tested By The Chosen
        </h2>
        <p className={`text-sm md:text-base max-w-lg mx-auto m-0 font-light leading-relaxed ${
          isLight ? 'text-[#635c51]' : 'text-[#b7aea3]'
        }`}>
          Unvarnished impressions from those who wear the symbols and walk their own path.
        </p>
      </div>

      {/* Row 1: Moves Right to Left */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div
          className="flex w-max gap-5 animate-marquee-left marquee-pause"
          style={{ '--marquee-duration': '40s' } as React.CSSProperties}
        >
          {row1Items.map((review, i) => (
            <div
              key={`row1-${review.id}-${i}`}
              className={`w-[300px] md:w-[380px] shrink-0 p-6 md:p-7 flex flex-col justify-between gap-5 transition-all duration-300 hover:-translate-y-1 shadow-lg user-select-none border ${
                isLight
                  ? 'bg-[#ede8dc] border-[#ded7c8] hover:border-[#b3262b]/60 hover:bg-[#e7e1d3]'
                  : 'bg-[#110f0f] border-[rgba(232,224,212,0.14)] hover:border-[#b3262b]/60 hover:bg-[#151313]'
              }`}
            >
              <div>
                {/* 5 Stars */}
                <div className="flex gap-1 text-[#b3262b] mb-3.5">
                  {Array.from({ length: review.rating }).map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      className="w-3.5 h-3.5 fill-[#b3262b] stroke-[#b3262b]"
                    />
                  ))}
                </div>
                {/* Quote */}
                <p className={`text-sm font-light leading-relaxed m-0 italic ${
                  isLight ? 'text-[#332f29]' : 'text-[#d6cdc1]'
                }`}>
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              {/* Author & Product */}
              <div>
                <div className={`flex justify-between items-center font-serif text-[13px] tracking-[0.1em] ${
                  isLight ? 'text-[#141212]' : 'text-[#e8e0d4]'
                }`}>
                  <span>{review.author}</span>
                  {review.verified && (
                    <span className={`flex items-center gap-1 font-sans text-[10px] tracking-wider uppercase ${
                      isLight ? 'text-[#7a7266]' : 'text-[#9a928a]'
                    }`}>
                      <CheckCircle className="w-3 h-3 text-[#b3262b]" />
                      Verified
                    </span>
                  )}
                </div>
                <div className={`text-[11px] tracking-wider uppercase mt-1 ${
                  isLight ? 'text-[#8a8174]' : 'text-[#9a928a]'
                }`}>
                  {review.product}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Moves Left to Right */}
      <div className="relative w-full overflow-hidden mt-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div
          className="flex w-max gap-5 animate-marquee-right marquee-pause"
          style={{ '--marquee-duration': '46s' } as React.CSSProperties}
        >
          {row2Items.map((review, i) => (
            <div
              key={`row2-${review.id}-${i}`}
              className={`w-[300px] md:w-[380px] shrink-0 p-6 md:p-7 flex flex-col justify-between gap-5 transition-all duration-300 hover:-translate-y-1 shadow-lg user-select-none border ${
                isLight
                  ? 'bg-[#ede8dc] border-[#ded7c8] hover:border-[#b3262b]/60 hover:bg-[#e7e1d3]'
                  : 'bg-[#110f0f] border-[rgba(232,224,212,0.14)] hover:border-[#b3262b]/60 hover:bg-[#151313]'
              }`}
            >
              <div>
                {/* 5 Stars */}
                <div className="flex gap-1 text-[#b3262b] mb-3.5">
                  {Array.from({ length: review.rating }).map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      className="w-3.5 h-3.5 fill-[#b3262b] stroke-[#b3262b]"
                    />
                  ))}
                </div>
                {/* Quote */}
                <p className={`text-sm font-light leading-relaxed m-0 italic ${
                  isLight ? 'text-[#332f29]' : 'text-[#d6cdc1]'
                }`}>
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              {/* Author & Product */}
              <div>
                <div className={`flex justify-between items-center font-serif text-[13px] tracking-[0.1em] ${
                  isLight ? 'text-[#141212]' : 'text-[#e8e0d4]'
                }`}>
                  <span>{review.author}</span>
                  {review.verified && (
                    <span className={`flex items-center gap-1 font-sans text-[10px] tracking-wider uppercase ${
                      isLight ? 'text-[#7a7266]' : 'text-[#9a928a]'
                    }`}>
                      <CheckCircle className="w-3 h-3 text-[#b3262b]" />
                      Verified
                    </span>
                  )}
                </div>
                <div className={`text-[11px] tracking-wider uppercase mt-1 ${
                  isLight ? 'text-[#8a8174]' : 'text-[#9a928a]'
                }`}>
                  {review.product}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
