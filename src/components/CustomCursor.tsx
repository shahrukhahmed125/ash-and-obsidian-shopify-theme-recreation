import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isHoverRef = useRef(false);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    const onMouseLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const onMouseEnter = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isTarget = !!target?.closest(
        'a, button, input, select, textarea, [role="button"], [data-cursor-hover], .group'
      );

      if (isTarget !== isHoverRef.current) {
        isHoverRef.current = isTarget;
        if (isTarget) {
          ring.classList.add('ao-cursor-active');
          dot.style.backgroundColor = '#e0343a';
        } else {
          ring.classList.remove('ao-cursor-active');
          dot.style.backgroundColor = '#e8e0d4';
        }
      }
    };

    const animate = () => {
      // Lerp ring towards mouse target smoothly
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      ring.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', checkHover, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', checkHover);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Central Cursor Ember Dot (Zero React state re-renders) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-200 bg-[#e8e0d4] shadow-[0_0_8px_#b3262b] will-change-transform"
      />

      {/* Outer Smooth Lagging Ring with Ash & Obsidian Sigil Sign */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-0 transition-[width,height,border-color,background-color,box-shadow,opacity] duration-250 ease-out will-change-transform w-10 h-10 border border-[rgba(232,224,212,0.35)] bg-[rgba(11,10,10,0.2)] shadow-[0_0_10px_rgba(0,0,0,0.5)] [&.ao-cursor-active]:w-16 [&.ao-cursor-active]:h-16 [&.ao-cursor-active]:border-[#b3262b] [&.ao-cursor-active]:bg-[rgba(179,38,43,0.14)] [&.ao-cursor-active]:shadow-[0_0_25px_rgba(179,38,43,0.45)]"
      >
        {/* Subtle Celestial Rotating Orbit Marks */}
        <div className="absolute inset-0 rounded-full border border-dashed border-[rgba(232,224,212,0.18)] animate-spin [animation-duration:24s]" />

        {/* Ash & Obsidian Signature Crown & Crest Emblem Sign */}
        <div className="transition-all duration-200 scale-75 opacity-70 group-hover:scale-105">
          <svg
            className="w-5 h-5 text-[#e8e0d4] drop-shadow-[0_0_4px_rgba(179,38,43,0.5)]"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26 62L28 38L42 50L50 28L58 50L72 38L74 62Z"
              fill="#b3262b"
              stroke="#e8e0d4"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <line x1="22" y1="68" x2="78" y2="68" stroke="#e8e0d4" strokeWidth="2.5" />
            <polygon points="50,44 54,50 50,56 46,50" fill="#ffffff" />
          </svg>
        </div>
      </div>
    </>
  );
};
