/* Premium Desktop Cursor Effect with A&O Signature Crest */
(function() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const dot = document.createElement('div');
  const ring = document.createElement('div');

  dot.className = 'ao-cursor-dot';
  ring.className = 'ao-cursor-ring';

  // SVG emblem inside the cursor
  ring.innerHTML = `
    <div class="ao-cursor-orbit"></div>
    <div class="ao-cursor-icon">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M26 62L28 38L42 50L50 28L58 50L72 38L74 62Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
        <line x1="22" y1="68" x2="78" y2="68" stroke="currentColor" stroke-width="3"/>
        <polygon points="50,44 54,50 50,56 46,50" fill="currentColor"/>
      </svg>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .ao-cursor-dot {
      position: fixed;
      top: 0;
      left: 0;
      width: 7px;
      height: 7px;
      background: #e8e0d4;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s ease, background-color 0.3s ease;
      box-shadow: 0 0 8px #b3262b;
    }
    .ao-cursor-ring {
      position: fixed;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
      border: 1px solid rgba(232, 224, 212, 0.35);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99998;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease;
      background: rgba(11, 10, 10, 0.2);
    }
    .ao-cursor-orbit {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 1px dashed rgba(232, 224, 212, 0.2);
      animation: aoCursorSpin 20s linear infinite;
    }
    .ao-cursor-icon {
      width: 18px;
      height: 18px;
      color: #b7aea3;
      transition: transform 0.3s ease, color 0.3s ease;
      transform: scale(0.85);
    }
    .ao-cursor-hover .ao-cursor-ring {
      width: 64px;
      height: 64px;
      border-color: #b3262b;
      background: rgba(179, 38, 43, 0.15);
      box-shadow: 0 0 25px rgba(179, 38, 43, 0.45);
    }
    .ao-cursor-hover .ao-cursor-orbit {
      border-color: rgba(224, 52, 58, 0.5);
      animation-duration: 8s;
    }
    .ao-cursor-hover .ao-cursor-icon {
      color: #e8e0d4;
      transform: scale(1.15);
      filter: drop-shadow(0 0 6px #b3262b);
    }
    .ao-cursor-hover .ao-cursor-dot {
      background: #e0343a;
    }
    .ao-cursor-hidden .ao-cursor-dot,
    .ao-cursor-hidden .ao-cursor-ring {
      opacity: 0;
    }
    @keyframes aoCursorSpin {
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  document.addEventListener('mouseleave', () => {
    document.body.classList.add('ao-cursor-hidden');
  });

  document.addEventListener('mouseenter', () => {
    document.body.classList.remove('ao-cursor-hidden');
  });

  function render() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  const hoverTargets = 'a, button, input, select, textarea, [data-cursor-hover], .ao-review-card, [role="button"], .ao-product-card';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.add('ao-cursor-hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.remove('ao-cursor-hover');
    }
  });
})();
