const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

const rootDir = path.resolve(__dirname, '..');
const themeDir = path.join(rootDir, 'shopify-theme');
const publicDir = path.join(rootDir, 'public');

// Ensure directories
['layout', 'templates', 'sections', 'snippets', 'assets', 'config', 'locales'].forEach(d => {
  fs.mkdirSync(path.join(themeDir, d), { recursive: true });
});
fs.mkdirSync(publicDir, { recursive: true });

console.log('Generating Shopify Theme Online Store 2.0 files...');

// 1. layout/theme.liquid
fs.writeFileSync(path.join(themeDir, 'layout', 'theme.liquid'), `<!doctype html>
<html class="no-js" lang="{{ request.locale.iso_code }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="theme-color" content="#0b0a0a">
    <link rel="canonical" href="{{ canonical_url }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Jost:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap" rel="stylesheet">

    {%- if settings.favicon != blank -%}
      <link rel="icon" type="image/png" href="{{ settings.favicon | image_url: width: 32, height: 32 }}">
    {%- endif -%}

    <title>
      {{ page_title }}
      {%- if current_tags %} &ndash; tagged "{{ current_tags | join: ', ' }}"{% endif -%}
      {%- if current_page != 1 %} &ndash; Page {{ current_page }}{% endif -%}
      {%- unless page_title contains shop.name %} &ndash; {{ shop.name }}{% endunless -%}
    </title>

    {% if page_description %}
      <meta name="description" content="{{ page_description | escape }}">
    {% endif %}

    {% render 'meta-tags' %}

    {{ content_for_header }}

    {{ 'theme.css' | asset_url | stylesheet_tag }}
    {{ 'reviews-marquee.css' | asset_url | stylesheet_tag }}

    <script>
      document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
      window.ShopifyTheme = {
        moneyFormat: {{ shop.money_format | json }},
        routes: {
          cart_add_url: '{{ routes.cart_add_url }}',
          cart_change_url: '{{ routes.cart_change_url }}',
          cart_update_url: '{{ routes.cart_update_url }}',
          cart_url: '{{ routes.cart_url }}',
          predictive_search_url: '{{ routes.predictive_search_url }}'
        }
      };
    </script>
  </head>

  <body class="template-{{ template.name }} bg-[#0b0a0a] text-[#e8e0d4] font-['Jost',sans-serif] selection:bg-[#7a1a1d] selection:text-white antialiased">
    <a class="skip-to-content sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-[#e8e0d4] focus:text-[#0b0a0a]" href="#MainContent">
      {{ 'accessibility.skip_to_text' | t | default: 'Skip to content' }}
    </a>

    {% render 'preloader' %}
    {% render 'custom-cursor' %}

    {% section 'announcement-bar' %}
    {% section 'header' %}

    <main id="MainContent" class="content-for-layout focus-none" role="main" tabindex="-1">
      {{ content_for_layout }}
    </main>

    {% section 'footer' %}

    {% render 'cart-drawer' %}
    {% render 'search-modal' %}
    {% render 'symbol-modals' %}

    <div id="ao-toast" class="ao-toast" role="status" aria-live="polite"></div>

    {{ 'theme.js' | asset_url | script_tag }}
    {{ 'cursor-effects.js' | asset_url | script_tag }}
  </body>
</html>
`);

// 2. assets/theme.css
fs.writeFileSync(path.join(themeDir, 'assets', 'theme.css'), `/* Ash & Obsidian — Authentic Theme CSS */
:root {
  --color-bg: #0b0a0a;
  --color-surface: #100e0e;
  --color-surface-subtle: #141212;
  --color-surface-card: #161413;
  --color-bone: #e8e0d4;
  --color-bone-muted: #b7aea3;
  --color-bone-faint: #9a928a;
  --color-crimson: #b3262b;
  --color-blood: #7a1a1d;
  --color-blood-glow: #e0343a;
  --border-subtle: rgba(232, 224, 212, 0.12);
  --border-medium: rgba(232, 224, 212, 0.25);
  --border-prominent: rgba(232, 224, 212, 0.45);
  --font-serif: 'Cinzel', serif;
  --font-sans: 'Jost', sans-serif;
}

*, *::before, *::after {
  box-sizing: border-box;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
  background-color: var(--color-bg);
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--color-bg);
  color: var(--color-bone);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6, .font-serif {
  font-family: var(--font-serif);
  font-weight: 400;
  letter-spacing: 0.03em;
}

a {
  color: var(--color-bone);
  text-decoration: none;
  transition: color 0.25s ease, opacity 0.25s ease;
}

a:hover {
  color: #ffffff;
}

button, input, select, textarea {
  font-family: inherit;
  color: inherit;
}

button {
  cursor: pointer;
  border: none;
  background: none;
}

::selection {
  background: var(--color-blood);
  color: #ffffff;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #0b0a0a;
}
::-webkit-scrollbar-thumb {
  background: rgba(232, 224, 212, 0.2);
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-crimson);
}

/* Utility Containers */
.ao-container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding-left: clamp(16px, 4vw, 48px);
  padding-right: clamp(16px, 4vw, 48px);
}

.ao-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 28px;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  white-space: nowrap;
  transition: all 0.3s cubic-bezier(0.2, 0.6, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.ao-btn-primary {
  background: var(--color-bone);
  color: #0b0a0a;
  border: 1px solid var(--color-bone);
}
.ao-btn-primary:hover {
  background: #ffffff;
  border-color: #ffffff;
  transform: translateY(-1px);
}

.ao-btn-outline {
  background: transparent;
  color: var(--color-bone);
  border: 1px solid rgba(232, 224, 212, 0.5);
}
.ao-btn-outline:hover {
  border-color: var(--color-bone);
  background: rgba(232, 224, 212, 0.08);
  transform: translateY(-1px);
}

/* Toast */
.ao-toast {
  position: fixed;
  left: 50%;
  bottom: 28px;
  z-index: 100;
  transform: translate(-50%, 20px);
  opacity: 0;
  visibility: hidden;
  transition: transform 0.4s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.4s ease, visibility 0.4s;
  background: var(--color-bone);
  color: #0b0a0a;
  padding: 14px 24px;
  font-size: 12px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  pointer-events: none;
  white-space: nowrap;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
}
.ao-toast.active {
  transform: translate(-50%, 0);
  opacity: 1;
  visibility: visible;
}

/* Color filters for variants */
.filter-obsidian { filter: none; }
.filter-ash { filter: grayscale(1) brightness(1.75) contrast(0.85); }
.filter-blood { filter: sepia(1) saturate(4) hue-rotate(-38deg) brightness(0.72); }
.filter-bone { filter: grayscale(1) invert(0.82) contrast(0.9); }
`);

// 3. assets/reviews-marquee.css
fs.writeFileSync(path.join(themeDir, 'assets', 'reviews-marquee.css'), `/* Customer Reviews Dual Marquee */
.ao-reviews-section {
  position: relative;
  background-color: #0b0a0a;
  overflow: hidden;
  padding: clamp(64px, 8vw, 110px) 0;
  border-top: 1px solid rgba(232, 224, 212, 0.12);
  border-bottom: 1px solid rgba(232, 224, 212, 0.12);
}

.ao-marquee-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-top: 36px;
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.ao-marquee-track {
  display: flex;
  width: max-content;
  gap: 20px;
  will-change: transform;
}

/* Row 1: Right to left */
.ao-marquee-left {
  animation: aoMarqueeLeft var(--speed-row-1, 45s) linear infinite;
}

/* Row 2: Left to right */
.ao-marquee-right {
  animation: aoMarqueeRight var(--speed-row-2, 50s) linear infinite;
}

.ao-marquee-wrapper:hover .ao-marquee-track {
  animation-play-state: paused;
}

@keyframes aoMarqueeLeft {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes aoMarqueeRight {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

.ao-review-card {
  width: clamp(280px, 30vw, 380px);
  flex-shrink: 0;
  background: #110f0f;
  border: 1px solid rgba(232, 224, 212, 0.14);
  padding: 24px 24px 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  transition: border-color 0.3s ease, transform 0.3s ease, background 0.3s ease;
  user-select: none;
}

.ao-review-card:hover {
  border-color: rgba(179, 38, 43, 0.6);
  background: #151313;
  transform: translateY(-2px);
}

.ao-review-stars {
  display: flex;
  gap: 4px;
  color: #b3262b;
}

.ao-review-quote {
  font-size: 14px;
  line-height: 1.6;
  color: #d6cdc1;
  font-weight: 300;
  margin: 0;
}

.ao-review-author {
  font-family: 'Cinzel', serif;
  font-size: 13px;
  letter-spacing: 0.1em;
  color: #e8e0d4;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ao-verified-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: 'Jost', sans-serif;
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #9a928a;
}

.ao-verified-badge svg {
  color: #b3262b;
}

@media (prefers-reduced-motion: reduce) {
  .ao-marquee-left, .ao-marquee-right {
    animation: none !important;
  }
  .ao-marquee-wrapper {
    overflow-x: auto;
    scrollbar-width: thin;
    mask-image: none;
    -webkit-mask-image: none;
  }
}
`);

// 4. assets/cursor-effects.js
fs.writeFileSync(path.join(themeDir, 'assets', 'cursor-effects.js'), `/* Premium Desktop Cursor Effect */
(function() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const dot = document.createElement('div');
  const ring = document.createElement('div');

  dot.className = 'ao-cursor-dot';
  ring.className = 'ao-cursor-ring';

  const style = document.createElement('style');
  style.textContent = \`
    .ao-cursor-dot {
      position: fixed;
      top: 0;
      left: 0;
      width: 6px;
      height: 6px;
      background: #e8e0d4;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s ease, transform 0.1s ease;
      mix-blend-mode: difference;
    }
    .ao-cursor-ring {
      position: fixed;
      top: 0;
      left: 0;
      width: 34px;
      height: 34px;
      border: 1px solid rgba(232, 224, 212, 0.4);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99998;
      transform: translate(-50%, -50%);
      transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease, opacity 0.3s ease;
    }
    .ao-cursor-hover .ao-cursor-ring {
      width: 54px;
      height: 54px;
      border-color: #b3262b;
      background: rgba(179, 38, 43, 0.08);
    }
    .ao-cursor-hidden .ao-cursor-dot,
    .ao-cursor-hidden .ao-cursor-ring {
      opacity: 0;
    }
  \`;
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

  const hoverTargets = 'a, button, input, select, textarea, [data-cursor-hover], .ao-review-card, [role="button"]';
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
`);

// 5. assets/theme.js
fs.writeFileSync(path.join(themeDir, 'assets', 'theme.js'), `/* Ash & Obsidian — Storefront Interactivity */
(function() {
  // Preloader
  window.addEventListener('load', () => {
    const preloader = document.getElementById('ao-preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('loaded');
        setTimeout(() => preloader.remove(), 600);
      }, 400);
    }
  });

  // Toast helper
  window.aoToast = function(msg) {
    const t = document.getElementById('ao-toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('active');
    clearTimeout(window.aoToastTimer);
    window.aoToastTimer = setTimeout(() => {
      t.classList.remove('active');
    }, 2500);
  };

  // Cart Drawer Logic
  const cartDrawer = document.getElementById('ao-cart-drawer');
  const cartOverlay = document.getElementById('ao-cart-overlay');
  const cartTriggers = document.querySelectorAll('[data-cart-trigger]');
  const cartCloses = document.querySelectorAll('[data-cart-close]');

  function openCart() {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.add('open');
      cartOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCart() {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.remove('open');
      cartOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  cartTriggers.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
  }));

  cartCloses.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    closeCart();
  }));

  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Search Modal
  const searchModal = document.getElementById('ao-search-modal');
  const searchTriggers = document.querySelectorAll('[data-search-trigger]');
  const searchCloses = document.querySelectorAll('[data-search-close]');
  const searchInput = document.getElementById('ao-search-input');

  function openSearch() {
    if (searchModal) {
      searchModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (searchInput) setTimeout(() => searchInput.focus(), 50);
    }
  }

  function closeSearch() {
    if (searchModal) {
      searchModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  searchTriggers.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openSearch();
  }));

  searchCloses.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    closeSearch();
  }));

  // ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeSearch();
      document.querySelectorAll('.ao-modal.open').forEach(m => m.classList.remove('open'));
    }
  });

  // Symbol Tabs
  const symbolButtons = document.querySelectorAll('[data-symbol-tab]');
  symbolButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.getAttribute('data-symbol-tab');
      symbolButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('[data-symbol-content]').forEach(c => {
        if (c.getAttribute('data-symbol-content') === idx) {
          c.classList.remove('hidden');
        } else {
          c.classList.add('hidden');
        }
      });
    });
  });

  // Header scroll detection
  const header = document.querySelector('.ao-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }
})();
`);

// 6. snippets/custom-cursor.liquid
fs.writeFileSync(path.join(themeDir, 'snippets', 'custom-cursor.liquid'), `{% comment %}
  Custom desktop cursor element
{% endcomment %}
<div id="ao-custom-cursor" class="pointer-events-none" aria-hidden="true"></div>
`);

// 7. snippets/preloader.liquid
fs.writeFileSync(path.join(themeDir, 'snippets', 'preloader.liquid'), `{% comment %}
  Ash & Obsidian Preloader
{% endcomment %}
<div id="ao-preloader" class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0b0a0a] transition-opacity duration-500 ease-out">
  <div class="relative flex flex-col items-center">
    {%- if settings.logo != blank -%}
      <img src="{{ settings.logo | image_url: width: 240 }}" alt="{{ shop.name }}" class="h-12 w-auto mb-6 opacity-90 animate-pulse">
    {%- else -%}
      <div class="font-serif text-3xl tracking-[0.2em] text-[#e8e0d4] mb-4">A&amp;O</div>
      <div class="w-16 h-[1.5px] bg-[#b3262b] mb-6"></div>
    {%- endif -%}
    <div class="w-36 h-[2px] bg-[rgba(232,224,212,0.15)] overflow-hidden">
      <div class="h-full bg-[#b3262b] w-1/2 animate-[marquee_1.2s_ease-in-out_infinite]"></div>
    </div>
  </div>
</div>
<style>
  #ao-preloader.loaded {
    opacity: 0;
    pointer-events: none;
  }
</style>
`);

// 8. snippets/meta-tags.liquid
fs.writeFileSync(path.join(themeDir, 'snippets', 'meta-tags.liquid'), `{%- liquid
  assign og_title = page_title | default: shop.name
  assign og_url = canonical_url | default: request.origin
  assign og_type = 'website'
  assign og_description = page_description | default: shop.description | default: shop.name
-%}
<meta property="og:site_name" content="{{ shop.name }}">
<meta property="og:url" content="{{ og_url }}">
<meta property="og:title" content="{{ og_title }}">
<meta property="og:type" content="{{ og_type }}">
<meta property="og:description" content="{{ og_description }}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{ og_title }}">
<meta name="twitter:description" content="{{ og_description }}">
`);

// 9. snippets/icon.liquid
fs.writeFileSync(path.join(themeDir, 'snippets', 'icon.liquid'), `{% comment %}
  Renders an SVG icon.
  Usage: {% render 'icon', name: 'search' %}
{% endcomment %}
{%- case name -%}
  {%- when 'search' -%}
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-3.5-3.5"></path></svg>
  {%- when 'account' -%}
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"></path></svg>
  {%- when 'bag' -%}
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 8h14l-1 13H6L5 8z"></path><path d="M9 8V6a3 3 0 016 0v2"></path></svg>
  {%- when 'close' -%}
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"></path></svg>
  {%- when 'star' -%}
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
  {%- when 'check' -%}
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
  {%- when 'arrow-right' -%}
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
{%- endcase -%}
`);

// 10. snippets/cart-drawer.liquid
fs.writeFileSync(path.join(themeDir, 'snippets', 'cart-drawer.liquid'), `{% comment %}
  Slide-over Cart Drawer
{% endcomment %}
<div id="ao-cart-overlay" class="fixed inset-0 z-50 bg-black/70 opacity-0 pointer-events-none transition-opacity duration-400 [&.open]:opacity-100 [&.open]:pointer-events-auto"></div>

<aside id="ao-cart-drawer" class="fixed top-0 right-0 bottom-0 z-51 w-full max-w-[420px] bg-[#100e0e] border-l border-[rgba(232,224,212,0.12)] translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] flex flex-col [&.open]:translate-x-0">
  <div class="flex justify-between items-center px-7 py-6 border-b border-[rgba(232,224,212,0.12)]">
    <div class="font-serif text-xl tracking-[0.08em] text-[#e8e0d4]">
      Your Bag (<span data-cart-count>{{ cart.item_count }}</span>)
    </div>
    <button data-cart-close aria-label="Close cart" class="p-2 text-[#e8e0d4] hover:text-white text-2xl leading-none">
      &times;
    </button>
  </div>

  {% comment %} Free shipping progress bar ($100 threshold) {% endcomment %}
  {% assign threshold = 10000 %}
  {% assign current = cart.total_price %}
  <div class="px-7 py-4 border-b border-[rgba(232,224,212,0.12)] flex flex-col gap-2">
    <div class="text-xs text-[#b7aea3]">
      {% if current >= threshold %}
        You’ve unlocked free complimentary shipping.
      {% else %}
        {{ threshold | minus: current | money }} away from free shipping
      {% endif %}
    </div>
    <div class="h-[2px] bg-[rgba(232,224,212,0.12)] w-full">
      <div class="h-full bg-[#b3262b] transition-all duration-500" style="width: {{ current | times: 100 | divided_by: threshold | at_most: 100 }}%"></div>
    </div>
  </div>

  <div class="flex-1 overflow-y-auto px-7 py-4" data-cart-items>
    {% if cart.empty? %}
      <div class="py-16 text-center flex flex-col items-center gap-5">
        <div class="text-[15px] text-[#b7aea3]">Your bag is empty.</div>
        <a href="#shop" data-cart-close class="ao-btn ao-btn-primary">
          Shop Drop I &rarr;
        </a>
      </div>
    {% else %}
      {% for item in cart.items %}
        <div class="grid grid-cols-[84px_1fr_auto] gap-4 py-4 border-b border-[rgba(232,224,212,0.08)]">
          <img src="{{ item.image | image_url: width: 180 }}" alt="{{ item.title | escape }}" class="w-[84px] h-[84px] object-cover bg-[#161413]">
          <div class="flex flex-col gap-1 min-w-0">
            <div class="text-xs tracking-[0.14em] uppercase text-[#e8e0d4] truncate">{{ item.product.title }}</div>
            <div class="text-xs text-[#9a928a]">{{ item.variant.title }}</div>
            <div class="flex items-center border border-[rgba(232,224,212,0.25)] w-max mt-2">
              <button class="w-7 h-7 flex items-center justify-center text-[#e8e0d4]" data-change-qty="-1" data-id="{{ item.key }}">&minus;</button>
              <span class="min-w-6 text-center text-xs">{{ item.quantity }}</span>
              <button class="w-7 h-7 flex items-center justify-center text-[#e8e0d4]" data-change-qty="1" data-id="{{ item.key }}">&plus;</button>
            </div>
          </div>
          <div class="flex flex-col items-end justify-between">
            <div class="text-sm text-[#e8e0d4]">{{ item.final_line_price | money }}</div>
            <button class="text-[11px] tracking-[0.14em] uppercase text-[#9a928a] underline" data-remove-item="{{ item.key }}">Remove</button>
          </div>
        </div>
      {% endfor %}
    {% endif %}
  </div>

  {% unless cart.empty? %}
    <div class="p-7 border-t border-[rgba(232,224,212,0.12)] flex flex-col gap-4">
      <div class="flex justify-between text-sm tracking-[0.1em] uppercase">
        <span class="text-[#b7aea3]">Subtotal</span>
        <span class="text-[#e8e0d4]" data-cart-subtotal>{{ cart.total_price | money }}</span>
      </div>
      <form action="{{ routes.cart_url }}" method="post">
        <button type="submit" name="checkout" class="w-full ao-btn ao-btn-primary">
          Checkout &rarr;
        </button>
      </form>
    </div>
  {% endunless %}
</aside>
`);

// 11. snippets/search-modal.liquid
fs.writeFileSync(path.join(themeDir, 'snippets', 'search-modal.liquid'), `{% comment %}
  Full-screen Search Modal
{% endcomment %}
<div id="ao-search-modal" class="fixed inset-0 z-60 bg-[#0b0a0a]/98 p-6 md:p-16 overflow-y-auto hidden [&.open]:block">
  <div class="max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <div class="text-xs tracking-[0.3em] uppercase text-[#9a928a]">Search the kingdom</div>
      <button data-search-close aria-label="Close search" class="text-2xl text-[#e8e0d4] hover:text-white p-2">&times;</button>
    </div>

    <form action="{{ routes.search_url }}" method="get" role="search">
      <input type="hidden" name="type" value="product">
      <input id="ao-search-input" type="search" name="q" placeholder="Pomegranate, hoodie, crown…" class="w-full bg-transparent border-0 border-b border-[rgba(232,224,212,0.35)] text-[#e8e0d4] font-serif text-2xl md:text-4xl py-3 focus:outline-none focus:border-[#b3262b] placeholder:text-[rgba(232,224,212,0.25)]">
    </form>

    <div class="mt-8 text-xs text-[#9a928a] tracking-[0.1em]">
      Try searching for: <span class="text-[#e8e0d4] cursor-pointer hover:underline" onclick="document.getElementById('ao-search-input').value='Obsidian';document.getElementById('ao-search-input').focus()">Obsidian</span>, <span class="text-[#e8e0d4] cursor-pointer hover:underline" onclick="document.getElementById('ao-search-input').value='Hoodie';document.getElementById('ao-search-input').focus()">Hoodie</span>, <span class="text-[#e8e0d4] cursor-pointer hover:underline" onclick="document.getElementById('ao-search-input').value='Crown';document.getElementById('ao-search-input').focus()">Crown</span>
    </div>
  </div>
</div>
`);

// 12. snippets/symbol-modals.liquid
fs.writeFileSync(path.join(themeDir, 'snippets', 'symbol-modals.liquid'), `{% comment %}
  Modals for Details and Packaging
{% endcomment %}
<div id="modal-details" class="ao-modal fixed inset-0 z-70 bg-black/80 hidden items-center justify-center p-5 [&.open]:flex">
  <div class="bg-[#100e0e] border border-[rgba(232,224,212,0.18)] max-w-lg w-full p-8 md:p-11 flex flex-col gap-4 relative">
    <button onclick="document.getElementById('modal-details').classList.remove('open')" class="absolute top-4 right-5 text-2xl text-[#e8e0d4]">&times;</button>
    <div class="text-xs tracking-[0.3em] uppercase text-[#b3262b]">Crafted for the real ones</div>
    <div class="font-serif text-2xl text-[#e8e0d4]">The details</div>
    <div class="flex flex-col gap-3 pt-3">
      <div class="flex gap-3 text-sm text-[#d6cdc1] border-t border-[rgba(232,224,212,0.1)] pt-3"><span class="text-[#9a928a]">&#10022;</span><span>320 GSM heavyweight cotton, garment-dyed for a worn-in hand.</span></div>
      <div class="flex gap-3 text-sm text-[#d6cdc1] border-t border-[rgba(232,224,212,0.1)] pt-3"><span class="text-[#9a928a]">&#10022;</span><span>Oversized drop-shoulder fit. Size down for a standard fit.</span></div>
      <div class="flex gap-3 text-sm text-[#d6cdc1] border-t border-[rgba(232,224,212,0.1)] pt-3"><span class="text-[#9a928a]">&#10022;</span><span>Raised puff and metallic prints, hand-finished in small batches.</span></div>
    </div>
  </div>
</div>

<div id="modal-packaging" class="ao-modal fixed inset-0 z-70 bg-black/80 hidden items-center justify-center p-5 [&.open]:flex">
  <div class="bg-[#100e0e] border border-[rgba(232,224,212,0.18)] max-w-lg w-full p-8 md:p-11 flex flex-col gap-4 relative">
    <button onclick="document.getElementById('modal-packaging').classList.remove('open')" class="absolute top-4 right-5 text-2xl text-[#e8e0d4]">&times;</button>
    <div class="text-xs tracking-[0.3em] uppercase text-[#b3262b]">More than the garment</div>
    <div class="font-serif text-2xl text-[#e8e0d4]">The packaging</div>
    <div class="flex flex-col gap-3 pt-3">
      <div class="flex gap-3 text-sm text-[#d6cdc1] border-t border-[rgba(232,224,212,0.1)] pt-3"><span class="text-[#9a928a]">&#10022;</span><span>Matte black rigid box sealed with a wax crest.</span></div>
      <div class="flex gap-3 text-sm text-[#d6cdc1] border-t border-[rgba(232,224,212,0.1)] pt-3"><span class="text-[#9a928a]">&#10022;</span><span>A lore card telling the story of your symbol.</span></div>
      <div class="flex gap-3 text-sm text-[#d6cdc1] border-t border-[rgba(232,224,212,0.1)] pt-3"><span class="text-[#9a928a]">&#10022;</span><span>One collectible symbol card, numbered per drop.</span></div>
    </div>
  </div>
</div>
`);

// 13. snippets/product-card.liquid
fs.writeFileSync(path.join(themeDir, 'snippets', 'product-card.liquid'), `{% comment %}
  Product Card Snippet
{% endcomment %}
<div class="ao-product-card group flex flex-col gap-3 relative" data-product-id="{{ product.id }}">
  <a href="{{ product.url }}" class="relative aspect-square overflow-hidden bg-[#161413] block">
    {% if product.featured_image != blank %}
      <img src="{{ product.featured_image | image_url: width: 600 }}" alt="{{ product.title | escape }}" class="w-full h-full object-cover transition-transform duration-900 ease-[cubic-bezier(0.2,0.6,0.2,1)] group-hover:scale-105" loading="lazy">
    {% else %}
      <div class="w-full h-full flex items-center justify-center text-[#9a928a] font-serif">A&amp;O</div>
    {% endif %}

    {% if product.compare_at_price > product.price %}
      <span class="absolute top-3 left-3 bg-[#b3262b] text-white text-[10px] tracking-widest px-2 py-1 uppercase">Sale</span>
    {% endif %}
  </a>

  <div class="flex justify-between items-start gap-2 pt-1">
    <div>
      <h3 class="text-xs tracking-[0.14em] uppercase text-[#e8e0d4] m-0">
        <a href="{{ product.url }}" class="hover:text-white">{{ product.title }}</a>
      </h3>
      <div class="text-sm text-[#d6cdc1] mt-1">{{ product.price | money }}</div>
    </div>

    {%- if product.available -%}
      <form method="post" action="{{ routes.cart_add_url }}" class="quick-add-form">
        <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}">
        <button type="submit" class="w-8 h-8 rounded-full border border-[rgba(232,224,212,0.45)] flex items-center justify-center text-[#e8e0d4] hover:bg-[#e8e0d4] hover:text-[#0b0a0a] transition-colors" title="Quick Add">
          &plus;
        </button>
      </form>
    {%- else -%}
      <span class="text-[10px] tracking-[0.15em] text-[#9a928a] uppercase">Sold Out</span>
    {%- endif -%}
  </div>
</div>
`);

// 14. sections/announcement-bar.liquid
fs.writeFileSync(path.join(themeDir, 'sections', 'announcement-bar.liquid'), `{% if section.settings.show_announcement %}
  <div class="ao-announcement-bar bg-[#100e0e] border-b border-[rgba(232,224,212,0.12)] py-2.5 px-4 text-center overflow-hidden">
    <div class="flex justify-center items-center gap-6 text-[10px] md:text-[11px] tracking-[0.24em] uppercase text-[#d6cdc1]">
      <span class="flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-[#b3262b]"></span>
        {{ section.settings.announcement_text }}
      </span>
      {% if section.settings.secondary_text != blank %}
        <span class="hidden md:inline text-[rgba(232,224,212,0.4)]">&bull;</span>
        <span class="hidden md:inline">{{ section.settings.secondary_text }}</span>
      {% endif %}
    </div>
  </div>
{% endif %}

{% schema %}
{
  "name": "Announcement bar",
  "settings": [
    {
      "type": "checkbox",
      "id": "show_announcement",
      "label": "Show announcement",
      "default": true
    },
    {
      "type": "text",
      "id": "announcement_text",
      "label": "Announcement text",
      "default": "Drop I Now Live — Complimentary shipping over $100"
    },
    {
      "type": "text",
      "id": "secondary_text",
      "label": "Secondary text",
      "default": "Forged in darkness"
    }
  ]
}
{% endschema %}
`);

// 15. sections/header.liquid
fs.writeFileSync(path.join(themeDir, 'sections', 'header.liquid'), `<header class="ao-header sticky top-0 left-0 right-0 z-40 h-[84px] grid grid-cols-[1fr_auto_1fr] items-center px-4 md:px-12 bg-[#0b0a0a]/80 border-b border-[rgba(232,224,212,0.12)] backdrop-blur-md transition-all duration-400">
  <nav class="flex gap-4 md:gap-8 text-[11px] tracking-[0.18em] uppercase" aria-label="Main navigation">
    {% for link in linklists[section.settings.menu].links %}
      <a href="{{ link.url }}" class="text-[#e8e0d4] opacity-85 hover:opacity-100 transition-opacity">{{ link.title }}</a>
    {% else %}
      <a href="#shop" class="text-[#e8e0d4] opacity-85 hover:opacity-100 transition-opacity">Shop</a>
      <a href="#collections" class="text-[#e8e0d4] opacity-85 hover:opacity-100 transition-opacity">Collections</a>
      <a href="#about" class="text-[#e8e0d4] opacity-85 hover:opacity-100 transition-opacity">About</a>
    {% endfor %}
  </nav>

  <a href="{{ routes.root_url }}" class="flex justify-center" aria-label="{{ shop.name }}">
    {% if section.settings.logo != blank %}
      <img src="{{ section.settings.logo | image_url: width: 240 }}" alt="{{ shop.name }}" class="h-[clamp(38px,4.8vw,58px)] w-auto block">
    {% else %}
      <img src="{{ 'ao-logo.png' | asset_url }}" alt="Ash &amp; Obsidian" class="h-[clamp(38px,4.8vw,58px)] w-auto block">
    {% endif %}
  </a>

  <div class="flex justify-end items-center gap-4 md:gap-5">
    <button data-search-trigger aria-label="Search" class="p-2 text-[#e8e0d4] hover:text-white transition-colors">
      {% render 'icon', name: 'search' %}
    </button>
    <a href="{{ routes.account_url | default: '#account' }}" onclick="if(!this.getAttribute('href').startsWith('/')) { event.preventDefault(); aoToast('Account portal opening soon'); }" aria-label="Account" class="p-2 text-[#e8e0d4] hover:text-white transition-colors">
      {% render 'icon', name: 'account' %}
    </a>
    <button data-cart-trigger aria-label="Bag" class="p-2 text-[#e8e0d4] hover:text-white transition-colors relative">
      {% render 'icon', name: 'bag' %}
      <span data-cart-count class="absolute -top-1 -right-1 min-w-4 h-4 rounded-full bg-[#8e1b1f] text-white text-[10px] flex items-center justify-center px-1 font-sans">
        {{ cart.item_count }}
      </span>
    </button>
  </div>
</header>

{% schema %}
{
  "name": "Header",
  "settings": [
    {
      "type": "image_picker",
      "id": "logo",
      "label": "Logo image"
    },
    {
      "type": "link_list",
      "id": "menu",
      "label": "Menu",
      "default": "main-menu"
    }
  ]
}
{% endschema %}
`);

// 16. sections/hero-banner.liquid
fs.writeFileSync(path.join(themeDir, 'sections', 'hero-banner.liquid'), `<section id="top" class="relative min-h-[max(600px,92vh)] overflow-hidden flex items-center px-5 md:px-20 py-28">
  <div class="absolute inset-0 bg-cover bg-[70%_30%] no-repeat transition-transform duration-[7000ms] ease-[cubic-bezier(0.2,0.6,0.2,1)]" style="background-image: url('{{ section.settings.image | image_url: width: 2000 | default: 'hero-bg.jpg' | asset_url }}');"></div>

  {% comment %} Authentic multi-stop gradient overlays {% endcomment %}
  <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,10,10,0.92)_0%,rgba(11,10,10,0.7)_30%,rgba(11,10,10,0)_55%),linear-gradient(0deg,#0b0a0a_0%,rgba(11,10,10,0)_28%),linear-gradient(180deg,rgba(11,10,10,0.6)_0%,rgba(11,10,10,0)_18%)]"></div>

  <div class="relative max-w-[620px] z-10">
    <div class="text-xs tracking-[0.32em] uppercase text-[#b7aea3] mb-5">
      {{ section.settings.kicker | default: 'Forged in darkness' }}
    </div>
    <h1 class="font-serif text-[clamp(40px,6.4vw,88px)] leading-none mb-6 tracking-[0.02em] text-[#e8e0d4] text-balance">
      {{ section.settings.heading | default: 'Create your own kingdom' }}
    </h1>
    <p class="text-[clamp(16px,1.5vw,20px)] leading-normal text-[#d6cdc1] mb-9 max-w-[360px]">
      {{ section.settings.subheading | default: 'Darkness forged. Strength earned. Kingdom chosen.' }}
    </p>

    <div class="flex flex-wrap gap-3.5">
      <a href="{{ section.settings.button_1_link | default: '#shop' }}" class="ao-btn ao-btn-primary">
        {{ section.settings.button_1_text | default: 'Shop Drop I' }} <span>&rarr;</span>
      </a>
      <a href="{{ section.settings.button_2_link | default: '#about' }}" class="ao-btn ao-btn-outline">
        {{ section.settings.button_2_text | default: 'Discover the story' }}
      </a>
    </div>
  </div>

  <div class="absolute right-[clamp(20px,4vw,56px)] bottom-10 whitespace-nowrap flex items-center gap-2.5 text-[11px] font-medium tracking-[0.24em] uppercase text-white bg-[#0b0a0a]/55 rounded-full backdrop-blur-md px-4 py-2 border border-[rgba(232,224,212,0.12)]">
    <span class="w-[7px] h-[7px] rounded-full bg-[#e0343a] shadow-[0_0_8px_#e0343a]"></span>
    <span>Drop I</span>
    <span class="w-3.5 h-[1px] bg-white/50"></span>
    <span>Now live</span>
  </div>
</section>

{% schema %}
{
  "name": "Hero banner",
  "settings": [
    {
      "type": "image_picker",
      "id": "image",
      "label": "Banner image"
    },
    {
      "type": "text",
      "id": "kicker",
      "label": "Kicker",
      "default": "Forged in darkness"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Create your own kingdom"
    },
    {
      "type": "textarea",
      "id": "subheading",
      "label": "Subheading",
      "default": "Darkness forged. Strength earned. Kingdom chosen."
    },
    {
      "type": "text",
      "id": "button_1_text",
      "label": "Button 1 label",
      "default": "Shop Drop I"
    },
    {
      "type": "url",
      "id": "button_1_link",
      "label": "Button 1 link"
    },
    {
      "type": "text",
      "id": "button_2_text",
      "label": "Button 2 label",
      "default": "Discover the story"
    },
    {
      "type": "url",
      "id": "button_2_link",
      "label": "Button 2 link"
    }
  ],
  "presets": [
    {
      "name": "Hero banner"
    }
  ]
}
{% endschema %}
`);

// 17. sections/collections-grid.liquid
fs.writeFileSync(path.join(themeDir, 'sections', 'collections-grid.liquid'), `<section id="collections" class="pt-6 px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4.5">
  {% for block in section.blocks %}
    <div class="relative aspect-[1/1.02] overflow-hidden bg-[#141212] group cursor-pointer" {{ block.shopify_attributes }}>
      <div class="absolute inset-0">
        {% if block.settings.image != blank %}
          <img src="{{ block.settings.image | image_url: width: 900 }}" alt="{{ block.settings.title }}" class="w-full h-full object-cover brightness-[0.8] transition-all duration-1200 ease-[cubic-bezier(0.2,0.6,0.2,1)] group-hover:brightness-95 group-hover:scale-105">
        {% else %}
          {% assign default_img = 'men-collection.jpg' %}
          {% if forloop.index == 2 %}{% assign default_img = 'women-collection.jpg' %}{% endif %}
          {% if forloop.index == 3 %}{% assign default_img = 'unisex-collection.jpg' %}{% endif %}
          <img src="{{ default_img | asset_url }}" alt="{{ block.settings.title }}" class="w-full h-full object-cover brightness-[0.8] transition-all duration-1200 ease-[cubic-bezier(0.2,0.6,0.2,1)] group-hover:brightness-95 group-hover:scale-105">
        {% endif %}
      </div>

      <div class="absolute inset-0 pointer-events-none bg-[linear-gradient(0deg,rgba(11,10,10,0.85)_0%,rgba(11,10,10,0)_50%)] flex flex-col justify-end items-center pb-7 gap-2">
        <h2 class="font-serif text-[clamp(26px,2.6vw,36px)] tracking-[0.06em] uppercase text-[#e8e0d4] m-0">
          {{ block.settings.title }}
        </h2>
        <div class="text-xs tracking-[0.14em] text-[#d6cdc1]">Explore &rarr;</div>
      </div>
    </div>
  {% endfor %}
</section>

{% schema %}
{
  "name": "Collections grid",
  "blocks": [
    {
      "type": "collection_card",
      "name": "Collection card",
      "settings": [
        {
          "type": "text",
          "id": "title",
          "label": "Title",
          "default": "Men"
        },
        {
          "type": "image_picker",
          "id": "image",
          "label": "Card image"
        },
        {
          "type": "url",
          "id": "link",
          "label": "Link"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Collections grid",
      "blocks": [
        { "type": "collection_card", "settings": { "title": "Men" } },
        { "type": "collection_card", "settings": { "title": "Women" } },
        { "type": "collection_card", "settings": { "title": "Unisex" } }
      ]
    }
  ]
}
{% endschema %}
`);

// 18. sections/featured-collection.liquid
fs.writeFileSync(path.join(themeDir, 'sections', 'featured-collection.liquid'), `<section id="shop" class="py-16 md:py-24 px-4 md:px-12">
  <div class="flex flex-wrap justify-between items-end gap-5 mb-9">
    <div>
      <div class="text-[11px] tracking-[0.3em] uppercase text-[#9a928a] mb-2.5">Drop I</div>
      <h2 class="font-serif text-[clamp(34px,4vw,56px)] tracking-[0.03em] m-0 text-[#e8e0d4]">
        {{ section.settings.heading | default: 'Bestsellers' }}
      </h2>
    </div>

    <div class="flex flex-wrap gap-2 items-center">
      <button class="bg-[#e8e0d4] text-[#0b0a0a] border border-[rgba(232,224,212,0.35)] px-4 py-2 text-[10px] tracking-[0.2em] uppercase transition-all" data-filter="All">All</button>
      <button class="bg-transparent text-[#e8e0d4] border border-[rgba(232,224,212,0.35)] px-4 py-2 text-[10px] tracking-[0.2em] uppercase hover:bg-[rgba(232,224,212,0.1)] transition-all" data-filter="Men">Men</button>
      <button class="bg-transparent text-[#e8e0d4] border border-[rgba(232,224,212,0.35)] px-4 py-2 text-[10px] tracking-[0.2em] uppercase hover:bg-[rgba(232,224,212,0.1)] transition-all" data-filter="Women">Women</button>
      <button class="bg-transparent text-[#e8e0d4] border border-[rgba(232,224,212,0.35)] px-4 py-2 text-[10px] tracking-[0.2em] uppercase hover:bg-[rgba(232,224,212,0.1)] transition-all" data-filter="Unisex">Unisex</button>
    </div>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {%- if section.settings.collection != blank and section.settings.collection.products_count > 0 -%}
      {% for product in section.settings.collection.products limit: section.settings.products_to_show %}
        {% render 'product-card', product: product %}
      {% endfor %}
    {%- else -%}
      {% comment %} Fallback authentic demonstration catalog {% endcomment %}
      <div class="ao-product-card group flex flex-col gap-3">
        <div class="relative aspect-square overflow-hidden bg-[#161413]">
          <img src="{{ 'p1-tee.jpg' | asset_url }}" alt="Obsidian Tee" class="w-full h-full object-cover transition-transform duration-900 group-hover:scale-105">
        </div>
        <div class="flex justify-between items-start pt-1">
          <div>
            <div class="text-xs tracking-[0.14em] uppercase text-[#e8e0d4]">Obsidian Tee</div>
            <div class="text-sm text-[#d6cdc1] mt-1">$69.00</div>
          </div>
          <button onclick="aoToast('Obsidian Tee added to bag')" class="w-8 h-8 rounded-full border border-[rgba(232,224,212,0.45)] flex items-center justify-center text-[#e8e0d4] hover:bg-[#e8e0d4] hover:text-[#0b0a0a] transition-all">&plus;</button>
        </div>
      </div>

      <div class="ao-product-card group flex flex-col gap-3">
        <div class="relative aspect-square overflow-hidden bg-[#161413]">
          <img src="{{ 'p2-hoodie.jpg' | asset_url }}" alt="Obsidian Crown Hoodie" class="w-full h-full object-cover transition-transform duration-900 group-hover:scale-105">
        </div>
        <div class="flex justify-between items-start pt-1">
          <div>
            <div class="text-xs tracking-[0.14em] uppercase text-[#e8e0d4]">Obsidian Crown Hoodie</div>
            <div class="text-sm text-[#d6cdc1] mt-1">$99.00</div>
          </div>
          <button onclick="aoToast('Obsidian Crown Hoodie added to bag')" class="w-8 h-8 rounded-full border border-[rgba(232,224,212,0.45)] flex items-center justify-center text-[#e8e0d4] hover:bg-[#e8e0d4] hover:text-[#0b0a0a] transition-all">&plus;</button>
        </div>
      </div>

      <div class="ao-product-card group flex flex-col gap-3">
        <div class="relative aspect-square overflow-hidden bg-[#161413]">
          <img src="{{ 'p3-vest.jpg' | asset_url }}" alt="Thorn Vest" class="w-full h-full object-cover transition-transform duration-900 group-hover:scale-105">
        </div>
        <div class="flex justify-between items-start pt-1">
          <div>
            <div class="text-xs tracking-[0.14em] uppercase text-[#e8e0d4]">Thorn Vest</div>
            <div class="text-sm text-[#d6cdc1] mt-1">$59.00</div>
          </div>
          <button onclick="aoToast('Thorn Vest added to bag')" class="w-8 h-8 rounded-full border border-[rgba(232,224,212,0.45)] flex items-center justify-center text-[#e8e0d4] hover:bg-[#e8e0d4] hover:text-[#0b0a0a] transition-all">&plus;</button>
        </div>
      </div>

      <div class="ao-product-card group flex flex-col gap-3">
        <div class="relative aspect-square overflow-hidden bg-[#161413]">
          <img src="{{ 'p4-heritage.jpg' | asset_url }}" alt="Heritage Tee" class="w-full h-full object-cover transition-transform duration-900 group-hover:scale-105">
        </div>
        <div class="flex justify-between items-start pt-1">
          <div>
            <div class="text-xs tracking-[0.14em] uppercase text-[#e8e0d4]">Heritage Tee</div>
            <div class="text-sm text-[#d6cdc1] mt-1">$69.00</div>
          </div>
          <button onclick="aoToast('Heritage Tee added to bag')" class="w-8 h-8 rounded-full border border-[rgba(232,224,212,0.45)] flex items-center justify-center text-[#e8e0d4] hover:bg-[#e8e0d4] hover:text-[#0b0a0a] transition-all">&plus;</button>
        </div>
      </div>
    {%- endif -%}
  </div>
</section>

{% schema %}
{
  "name": "Featured collection",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Bestsellers"
    },
    {
      "type": "collection",
      "id": "collection",
      "label": "Collection"
    },
    {
      "type": "range",
      "id": "products_to_show",
      "min": 2,
      "max": 12,
      "step": 1,
      "default": 4,
      "label": "Products to show"
    }
  ],
  "presets": [
    {
      "name": "Featured collection"
    }
  ]
}
{% endschema %}
`);

// 19. sections/story-video.liquid
fs.writeFileSync(path.join(themeDir, 'sections', 'story-video.liquid'), `<section id="about" class="relative mt-16 min-h-[520px] flex items-center overflow-hidden px-5 md:px-20 py-20">
  <video src="{{ 'hero-video.mp4' | asset_url }}" poster="{{ 'video-poster.jpg' | asset_url }}" autoplay muted loop playsinline class="absolute top-0 right-0 w-full h-full object-cover grayscale-[0.55] sepia-[0.35] contrast-[1.15] brightness-[0.62] saturate-[0.9]"></video>

  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,rgba(122,26,29,0.22),rgba(11,10,10,0)_60%)] mix-blend-soft-light pointer-events-none"></div>
  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,10,10,0)_45%,rgba(11,10,10,0.75)_100%)] pointer-events-none"></div>
  <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,10,10,0.92)_0%,rgba(11,10,10,0.7)_30%,rgba(11,10,10,0.15)_60%,rgba(11,10,10,0)_80%),linear-gradient(0deg,rgba(11,10,10,0.6),rgba(11,10,10,0)_30%)]"></div>

  <div class="relative max-w-[480px] z-10">
    <div class="text-xs tracking-[0.3em] uppercase text-[#b7aea3] mb-4.5">
      {{ section.settings.kicker | default: 'More than clothing' }}
    </div>
    <h2 class="font-serif text-[clamp(38px,5vw,72px)] leading-none mb-5.5 tracking-[0.02em] text-[#e8e0d4]">
      {{ section.settings.heading | default: 'A state of mind' }}
    </h2>
    <p class="text-[17px] leading-relaxed text-[#d6cdc1] mb-8">
      {{ section.settings.text | default: 'For those who stand apart. A collection built on symbols, stories and strength.' }}
    </p>
    <a href="{{ section.settings.button_link | default: '#symbols' }}" class="ao-btn ao-btn-outline">
      {{ section.settings.button_text | default: 'Explore the collection' }} <span>&rarr;</span>
    </a>
  </div>
</section>

{% schema %}
{
  "name": "Story video banner",
  "settings": [
    {
      "type": "text",
      "id": "kicker",
      "label": "Kicker",
      "default": "More than clothing"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "A state of mind"
    },
    {
      "type": "textarea",
      "id": "text",
      "label": "Text",
      "default": "For those who stand apart. A collection built on symbols, stories and strength."
    },
    {
      "type": "text",
      "id": "button_text",
      "label": "Button text",
      "default": "Explore the collection"
    },
    {
      "type": "url",
      "id": "button_link",
      "label": "Button link"
    }
  ],
  "presets": [
    {
      "name": "Story video banner"
    }
  ]
}
{% endschema %}
`);

// 20. sections/seven-symbols.liquid
fs.writeFileSync(path.join(themeDir, 'sections', 'seven-symbols.liquid'), `<section id="symbols" class="py-16 md:py-28 px-4 md:px-12">
  <div class="flex flex-wrap justify-between items-end gap-4 mb-8">
    <div>
      <h2 class="font-serif text-[clamp(28px,3vw,42px)] m-0 mb-2.5 tracking-[0.04em] text-[#e8e0d4]">
        {{ section.settings.heading | default: 'The Seven Symbols' }}
      </h2>
      <div class="text-xs tracking-[0.2em] uppercase text-[#9a928a]">
        {{ section.settings.subheading | default: 'Some paths are chosen for us. Others, we choose ourselves.' }}
      </div>
    </div>
    <div class="text-[11px] tracking-[0.2em] uppercase text-[#9a928a]">Select a symbol</div>
  </div>

  {% comment %} 7 Symbols selector grid {% endcomment %}
  <div class="grid grid-cols-7 gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
    {% assign sym_names = "Pomegranate,Thorns,Ash,Obsidian,Crown,Cerberus,Kingdom" | split: "," %}
    {% assign sym_meanings = "The Choice,The Cost,What You Leave Behind,What You Become,What You Earn,The Gate You Must Pass,The Life You Choose to Build" | split: "," %}
    {% assign sym_files = "s1-pomegranate.png,s2-thorns.png,s3-ash.png,s4-obsidian.png,s5-crown.png,s6-cerberus.png,s7-kingdom.png" | split: "," %}

    {% for name in sym_names %}
      {% assign idx = forloop.index0 %}
      <button data-symbol-tab="{{ idx }}" class="bg-[#0f0d0d] border border-[rgba(232,224,212,0.15)] text-[#e8e0d4] p-3 md:p-4.5 flex flex-col items-center gap-3 text-center transition-all duration-300 hover:border-[rgba(232,224,212,0.5)] [&.active]:bg-[#1a1414] [&.active]:border-[#b3262b] [&.active]:-translate-y-1 {% if forloop.first %}active{% endif %}">
        <img src="{{ sym_files[idx] | asset_url }}" alt="The {{ name }}" class="w-full aspect-[86/115] object-contain block">
        <div class="font-serif text-[clamp(11px,1vw,13px)] tracking-[0.08em] uppercase leading-tight">The {{ name }}</div>
        <div class="text-[12px] text-[#9a928a] leading-tight">{{ sym_meanings[idx] }}</div>
      </button>
    {% endfor %}
  </div>

  {% comment %} Active symbol detail panels {% endcomment %}
  {% assign sym_numerals = "I,II,III,IV,V,VI,VII" | split: "," %}
  {% assign sym_lores = "Once tasted, there is no return. The pomegranate marks the moment you decide who you will be.|Nothing worth holding comes without blood. The thorns remember every price you paid.|Everything you burned to get here. Ash is proof that you did not stay the same.|Glass born from fire and cooled in the dark. Sharp, quiet, unbreakable.|Not given. Not inherited. Forged piece by piece by the one who wears it.|Three heads, three trials. Every kingdom is guarded, and the guard is often yourself.|The final symbol. Walls you raised, rules you wrote, a place that answers only to you." | split: "|" %}

  <div class="mt-6 border border-[rgba(232,224,212,0.15)] bg-[#110f0f]">
    {% for name in sym_names %}
      {% assign idx = forloop.index0 %}
      <div data-symbol-content="{{ idx }}" class="grid grid-cols-1 md:grid-cols-2 {% unless forloop.first %}hidden{% endunless %}">
        <div class="bg-[#0b0a0a] flex items-center justify-center p-7 min-h-[280px]">
          <img src="{{ sym_files[idx] | asset_url }}" alt="The {{ name }}" class="h-60 max-w-full object-contain">
        </div>
        <div class="p-7 md:p-14 flex flex-col justify-center gap-4">
          <div class="text-[11px] tracking-[0.3em] uppercase text-[#b3262b]">Symbol {{ sym_numerals[idx] }} of VII</div>
          <div class="font-serif text-[clamp(28px,3vw,40px)] tracking-[0.04em] text-[#e8e0d4]">The {{ name }}</div>
          <div class="text-[13px] tracking-[0.2em] uppercase text-[#d6cdc1]">{{ sym_meanings[idx] }}</div>
          <p class="text-base leading-relaxed text-[#b7aea3] m-0 max-w-[460px]">{{ sym_lores[idx] }}</p>
        </div>
      </div>
    {% endfor %}
  </div>
</section>

{% schema %}
{
  "name": "The Seven Symbols",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "The Seven Symbols"
    },
    {
      "type": "text",
      "id": "subheading",
      "label": "Subheading",
      "default": "Some paths are chosen for us. Others, we choose ourselves."
    }
  ],
  "presets": [
    {
      "name": "The Seven Symbols"
    }
  ]
}
{% endschema %}
`);

// 21. sections/promo-cards.liquid
fs.writeFileSync(path.join(themeDir, 'sections', 'promo-cards.liquid'), `<section class="grid grid-cols-1 md:grid-cols-2 gap-1 px-1">
  <div class="relative min-h-[380px] overflow-hidden flex items-center p-8 md:p-14">
    <div class="absolute top-0 right-0 bottom-0 w-[72%] bg-cover bg-[65%_center] no-repeat" style="background-image: url('{{ 'crafted-new.jpg' | asset_url }}');"></div>
    <div class="absolute inset-0 bg-[linear-gradient(90deg,#0b0a0a_35%,rgba(11,10,10,0.4)_70%,rgba(11,10,10,0.1))]"></div>
    <div class="relative max-w-[300px] flex flex-col gap-4.5 items-start z-10">
      <h3 class="font-serif text-[clamp(26px,2.6vw,36px)] leading-tight m-0 text-[#e8e0d4]">Crafted for the real ones</h3>
      <p class="text-[15px] leading-relaxed text-[#b7aea3] m-0">Premium fabrics. Timeless designs. Built to last.</p>
      <button onclick="document.getElementById('modal-details').classList.add('open')" class="ao-btn ao-btn-outline">
        The details <span>&rarr;</span>
      </button>
    </div>
  </div>

  <div class="relative min-h-[380px] overflow-hidden flex items-center p-8 md:p-14">
    <div class="absolute top-0 right-0 bottom-0 w-[72%] bg-cover bg-[70%_center] no-repeat" style="background-image: url('{{ 'packaging-box.jpg' | asset_url }}');"></div>
    <div class="absolute inset-0 bg-[linear-gradient(90deg,#0b0a0a_40%,rgba(11,10,10,0.4)_70%,rgba(11,10,10,0.1))]"></div>
    <div class="relative max-w-[300px] flex flex-col gap-4.5 items-start z-10">
      <h3 class="font-serif text-[clamp(26px,2.6vw,36px)] leading-tight m-0 text-[#e8e0d4]">More than the garment</h3>
      <p class="text-[15px] leading-relaxed text-[#b7aea3] m-0">Every order comes with a piece of the kingdom. Custom packaging, lore card and collectible symbol card.</p>
      <button onclick="document.getElementById('modal-packaging').classList.add('open')" class="ao-btn ao-btn-outline">
        The packaging <span>&rarr;</span>
      </button>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Promo banners",
  "presets": [
    {
      "name": "Promo banners"
    }
  ]
}
{% endschema %}
`);

// 22. sections/customer-reviews-marquee.liquid (CRITICAL REQUIREMENT: DUAL ANIMATED MARQUEE ROWS)
fs.writeFileSync(path.join(themeDir, 'sections', 'customer-reviews-marquee.liquid'), `<section class="ao-reviews-section">
  <div class="ao-container text-center mb-6">
    <div class="text-[11px] tracking-[0.3em] uppercase text-[#b3262b] mb-2.5">
      {{ section.settings.kicker | default: 'Voices From The Kingdom' }}
    </div>
    <h2 class="font-serif text-[clamp(30px,3.8vw,52px)] text-[#e8e0d4] tracking-[0.03em] m-0 mb-3">
      {{ section.settings.heading | default: 'Tested By The Chosen' }}
    </h2>
    <p class="text-sm md:text-base text-[#b7aea3] max-w-lg mx-auto m-0">
      {{ section.settings.subheading | default: 'Unvarnished impressions from those who wear the symbols and walk their own path.' }}
    </p>
  </div>

  {% comment %} ROW 1: Right to Left continuous loop {% endcomment %}
  <div class="ao-marquee-wrapper" style="--speed-row-1: {{ section.settings.speed_row_1 | default: 42 }}s;">
    <div class="ao-marquee-track ao-marquee-left">
      {% for i in (1..2) %}
        {% for block in section.blocks %}
          {% if block.settings.row == '1' %}
            <div class="ao-review-card" {{ block.shopify_attributes }}>
              <div>
                <div class="ao-review-stars mb-3">
                  {% for star in (1..5) %}
                    {% render 'icon', name: 'star' %}
                  {% endfor %}
                </div>
                <p class="ao-review-quote">“{{ block.settings.quote }}”</p>
              </div>
              <div>
                <div class="ao-review-author">
                  <span>{{ block.settings.author }}</span>
                  {% if block.settings.verified %}
                    <span class="ao-verified-badge">
                      {% render 'icon', name: 'check' %}
                      Verified
                    </span>
                  {% endif %}
                </div>
                {% if block.settings.product_tag != blank %}
                  <div class="text-[11px] text-[#9a928a] tracking-wider uppercase mt-1">{{ block.settings.product_tag }}</div>
                {% endif %}
              </div>
            </div>
          {% endif %}
        {% endfor %}
      {% endfor %}
    </div>
  </div>

  {% comment %} ROW 2: Left to Right continuous loop with independent speed {% endcomment %}
  <div class="ao-marquee-wrapper mt-5" style="--speed-row-2: {{ section.settings.speed_row_2 | default: 48 }}s;">
    <div class="ao-marquee-track ao-marquee-right">
      {% for i in (1..2) %}
        {% for block in section.blocks %}
          {% if block.settings.row == '2' %}
            <div class="ao-review-card" {{ block.shopify_attributes }}>
              <div>
                <div class="ao-review-stars mb-3">
                  {% for star in (1..5) %}
                    {% render 'icon', name: 'star' %}
                  {% endfor %}
                </div>
                <p class="ao-review-quote">“{{ block.settings.quote }}”</p>
              </div>
              <div>
                <div class="ao-review-author">
                  <span>{{ block.settings.author }}</span>
                  {% if block.settings.verified %}
                    <span class="ao-verified-badge">
                      {% render 'icon', name: 'check' %}
                      Verified
                    </span>
                  {% endif %}
                </div>
                {% if block.settings.product_tag != blank %}
                  <div class="text-[11px] text-[#9a928a] tracking-wider uppercase mt-1">{{ block.settings.product_tag }}</div>
                {% endif %}
              </div>
            </div>
          {% endif %}
        {% endfor %}
      {% endfor %}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Customer reviews marquee",
  "settings": [
    {
      "type": "text",
      "id": "kicker",
      "label": "Kicker",
      "default": "Voices From The Kingdom"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Tested By The Chosen"
    },
    {
      "type": "text",
      "id": "subheading",
      "label": "Subheading",
      "default": "Unvarnished impressions from those who wear the symbols and walk their own path."
    },
    {
      "type": "range",
      "id": "speed_row_1",
      "min": 20,
      "max": 80,
      "step": 2,
      "unit": "s",
      "label": "Row 1 Speed (seconds)",
      "default": 42
    },
    {
      "type": "range",
      "id": "speed_row_2",
      "min": 20,
      "max": 80,
      "step": 2,
      "unit": "s",
      "label": "Row 2 Speed (seconds)",
      "default": 48
    }
  ],
  "blocks": [
    {
      "type": "review",
      "name": "Review card",
      "settings": [
        {
          "type": "select",
          "id": "row",
          "label": "Row assignment",
          "options": [
            { "value": "1", "label": "Row 1 (Right to Left)" },
            { "value": "2", "label": "Row 2 (Left to Right)" }
          ],
          "default": "1"
        },
        {
          "type": "textarea",
          "id": "quote",
          "label": "Review text",
          "default": "The 320 GSM weight is unreal. It holds structure like armor without feeling stiff. Nothing else compares."
        },
        {
          "type": "text",
          "id": "author",
          "label": "Author name",
          "default": "Darius K."
        },
        {
          "type": "text",
          "id": "product_tag",
          "label": "Product purchased",
          "default": "Obsidian Crown Hoodie"
        },
        {
          "type": "checkbox",
          "id": "verified",
          "label": "Verified buyer badge",
          "default": true
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Customer reviews marquee",
      "blocks": [
        { "type": "review", "settings": { "row": "1", "quote": "The 320 GSM weight is unreal. It holds structure like armor without feeling stiff.", "author": "Marcus V.", "product_tag": "Obsidian Crown Hoodie" } },
        { "type": "review", "settings": { "row": "1", "quote": "The wax seal packaging and the lore card made opening this an unforgettable ritual.", "author": "Elena R.", "product_tag": "Pomegranate Crop Tee" } },
        { "type": "review", "settings": { "row": "1", "quote": "Subtle puff print detailing that catches light in all the right ways. Instant grail piece.", "author": "Julian M.", "product_tag": "Obsidian Tee" } },
        { "type": "review", "settings": { "row": "1", "quote": "Heavyweight cotton drape is supreme. Worth every single penny.", "author": "Nathan S.", "product_tag": "Thorn Vest" } },
        { "type": "review", "settings": { "row": "2", "quote": "You can immediately feel this was crafted with true conviction. Dark aesthetic done right.", "author": "Soren B.", "product_tag": "Heritage Tee" } },
        { "type": "review", "settings": { "row": "2", "quote": "The Seven Symbols concept gives real meaning to what you are wearing. Outstanding quality.", "author": "Kaelen T.", "product_tag": "Obsidian Crown Hoodie" } },
        { "type": "review", "settings": { "row": "2", "quote": "Washed it 5 times and the color depth hasn't shifted an inch. Unmatched craftsmanship.", "author": "Rowan H.", "product_tag": "Obsidian Tee" } },
        { "type": "review", "settings": { "row": "2", "quote": "Clean drop-shoulder cut. Gets compliments every single time I step out.", "author": "Zane L.", "product_tag": "Thorn Vest" } }
      ]
    }
  ]
}
{% endschema %}
`);

// 23. sections/community-banner.liquid
fs.writeFileSync(path.join(themeDir, 'sections', 'community-banner.liquid'), `<section class="relative min-h-[480px] flex items-center justify-end overflow-hidden my-1 px-5 md:px-20 py-16">
  <div class="absolute top-0 left-0 bottom-0 w-[min(70%,1100px)] bg-cover bg-[30%_center] no-repeat" style="background-image: url('{{ 'inner-circle-bg.jpg' | asset_url }}');"></div>
  <div class="absolute inset-0 bg-[linear-gradient(270deg,#120909_32%,rgba(18,9,9,0.7)_50%,rgba(11,10,10,0)_72%),radial-gradient(ellipse_at_85%_50%,rgba(122,26,29,0.28),transparent_60%)]"></div>

  <div class="relative max-w-[460px] text-center flex flex-col items-center gap-5 z-10">
    <div class="flex items-center gap-2.5 text-[#9a928a]">
      <span class="w-[60px] h-[1px] bg-current"></span>
      <span class="text-sm">&#10022;</span>
      <span class="w-[60px] h-[1px] bg-current"></span>
    </div>

    <h2 class="font-serif text-[clamp(34px,4vw,58px)] leading-tight m-0 text-[#e8e0d4]">
      {{ section.settings.heading | default: 'Built by different kind' }}
    </h2>
    <p class="text-base leading-relaxed text-[#d6cdc1] m-0">
      {{ section.settings.text | default: 'A community for those who move differently, think deeper and create their own path.' }}
    </p>
    <a href="#footer" class="ao-btn ao-btn-outline">
      {{ section.settings.button_text | default: 'Join the inner circle' }} <span>&rarr;</span>
    </a>
  </div>
</section>

{% schema %}
{
  "name": "Community banner",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Built by different kind"
    },
    {
      "type": "textarea",
      "id": "text",
      "label": "Text",
      "default": "A community for those who move differently, think deeper and create their own path."
    },
    {
      "type": "text",
      "id": "button_text",
      "label": "Button text",
      "default": "Join the inner circle"
    }
  ],
  "presets": [
    {
      "name": "Community banner"
    }
  ]
}
{% endschema %}
`);

// 24. sections/instagram-feed.liquid
fs.writeFileSync(path.join(themeDir, 'sections', 'instagram-feed.liquid'), `<section class="py-12 md:py-20 px-4 md:px-8">
  <div class="flex justify-between items-center mb-4.5 px-1">
    <div class="text-xs tracking-[0.2em] uppercase text-[#e8e0d4]">
      {{ section.settings.handle | default: '@ashandobsidian' }}
    </div>
    <a href="{{ section.settings.link | default: 'https://instagram.com' }}" target="_blank" rel="noopener" class="text-[11px] tracking-[0.2em] uppercase border-b border-[rgba(232,224,212,0.5)] pb-1 hover:text-white">
      Follow us &rarr;
    </a>
  </div>

  <div class="grid grid-cols-2 md:grid-cols-6 gap-2">
    {% assign ig_images = "crafted-new.jpg,ig2-new.jpg,ig3-new.jpg,ig4-new.jpg,ig5-new.jpg,ig6-new.jpg" | split: "," %}
    {% for img in ig_images %}
      <div class="aspect-[106/124] overflow-hidden bg-[#141212] group cursor-pointer" onclick="aoToast('@ashandobsidian')">
        <img src="{{ img | asset_url }}" alt="Instagram" class="w-full h-full object-cover brightness-85 group-hover:brightness-105 group-hover:scale-105 transition-all duration-700">
      </div>
    {% endfor %}
  </div>
</section>

{% schema %}
{
  "name": "Instagram feed",
  "settings": [
    {
      "type": "text",
      "id": "handle",
      "label": "Handle",
      "default": "@ashandobsidian"
    },
    {
      "type": "url",
      "id": "link",
      "label": "Profile link"
    }
  ],
  "presets": [
    {
      "name": "Instagram feed"
    }
  ]
}
{% endschema %}
`);

// 25. sections/footer.liquid
fs.writeFileSync(path.join(themeDir, 'sections', 'footer.liquid'), `<footer id="footer" class="border-t border-[rgba(232,224,212,0.12)] pt-14 pb-7 px-5 md:px-12 bg-[#0b0a0a]">
  <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
    <div class="flex flex-col gap-4.5">
      <img src="{{ 'ao-logo.png' | asset_url }}" alt="Ash &amp; Obsidian" class="w-72 max-w-full block">
      <div class="font-serif text-xs tracking-[0.24em] uppercase text-[#d6cdc1]">
        Create your own kingdom
      </div>
    </div>

    <div class="flex flex-col gap-2.5 text-sm">
      <div class="text-[11px] tracking-[0.24em] uppercase mb-1.5 text-[#e8e0d4]">Shop</div>
      <a href="#shop" class="text-[#b7aea3] hover:text-white">All Products</a>
      <a href="#collections" class="text-[#b7aea3] hover:text-white">Men</a>
      <a href="#collections" class="text-[#b7aea3] hover:text-white">Women</a>
      <a href="#collections" class="text-[#b7aea3] hover:text-white">Unisex</a>
      <a href="#collections" class="text-[#b7aea3] hover:text-white">Collections</a>
    </div>

    <div class="flex flex-col gap-2.5 text-sm">
      <div class="text-[11px] tracking-[0.24em] uppercase mb-1.5 text-[#e8e0d4]">About</div>
      <a href="#about" class="text-[#b7aea3] hover:text-white">Our Story</a>
      <a href="#symbols" class="text-[#b7aea3] hover:text-white">The Seven Symbols</a>
      <a href="#sustainability" onclick="event.preventDefault(); aoToast('Garment-dyed small batch production');" class="text-[#b7aea3] hover:text-white">Sustainability</a>
      <a href="#sizing" onclick="event.preventDefault(); document.getElementById('modal-details').classList.add('open')" class="text-[#b7aea3] hover:text-white">Size Guide</a>
      <a href="#contact" class="text-[#b7aea3] hover:text-white">Contact</a>
    </div>

    <div class="flex flex-col gap-3.5">
      <div class="text-[11px] tracking-[0.24em] uppercase text-[#e8e0d4]">Join the kingdom</div>
      <p class="text-xs text-[#b7aea3] leading-relaxed m-0">
        Be first to know about new drops, secret releases and private events.
      </p>
      {% form 'customer', class: 'flex mt-2' %}
        <input type="hidden" name="contact[tags]" value="newsletter">
        <input type="email" name="contact[email]" placeholder="Enter your email" required class="flex-1 bg-transparent border-0 border-b border-[rgba(232,224,212,0.3)] text-xs text-[#e8e0d4] py-2 focus:outline-none focus:border-[#b3262b] placeholder:text-[#9a928a]">
        <button type="submit" class="text-xs tracking-[0.2em] uppercase text-[#e8e0d4] hover:text-white pl-3 border-b border-[rgba(232,224,212,0.3)]">
          Join &rarr;
        </button>
      {% endform %}

      <div class="flex gap-4 mt-3 text-xs tracking-wider uppercase">
        <a href="https://instagram.com" target="_blank" class="text-[#b7aea3] hover:text-white">Instagram</a>
        <a href="https://tiktok.com" target="_blank" class="text-[#b7aea3] hover:text-white">TikTok</a>
        <a href="https://youtube.com" target="_blank" class="text-[#b7aea3] hover:text-white">YouTube</a>
      </div>
    </div>
  </div>

  <div class="mt-14 pt-5.5 border-t border-[rgba(232,224,212,0.12)] flex flex-wrap justify-between gap-4 text-xs text-[#8a837b]">
    <div>&copy; {{ 'now' | date: '%Y' }} Ash &amp; Obsidian. All rights reserved.</div>
    <div class="flex flex-wrap gap-6">
      <a href="#" onclick="event.preventDefault(); aoToast('Privacy Policy');" class="text-[#8a837b] hover:text-[#e8e0d4]">Privacy Policy</a>
      <a href="#" onclick="event.preventDefault(); aoToast('Complimentary shipping over $100');" class="text-[#8a837b] hover:text-[#e8e0d4]">Shipping Policy</a>
      <a href="#" onclick="event.preventDefault(); aoToast('30-day hassle-free returns');" class="text-[#8a837b] hover:text-[#e8e0d4]">Returns</a>
      <a href="#" onclick="event.preventDefault(); aoToast('Terms of Service');" class="text-[#8a837b] hover:text-[#e8e0d4]">Terms</a>
    </div>
  </div>
</footer>

{% schema %}
{
  "name": "Footer",
  "settings": []
}
{% endschema %}
`);

// 26. sections/main-product.liquid
fs.writeFileSync(path.join(themeDir, 'sections', 'main-product.liquid'), `<section class="py-12 md:py-20 px-4 md:px-12">
  <div class="ao-container grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
    <div class="aspect-square bg-[#161413] overflow-hidden">
      {% if product.featured_image != blank %}
        <img src="{{ product.featured_image | image_url: width: 1000 }}" alt="{{ product.title | escape }}" class="w-full h-full object-cover">
      {% else %}
        <img src="{{ 'p1-tee.jpg' | asset_url }}" alt="{{ product.title | default: 'Ash & Obsidian Product' }}" class="w-full h-full object-cover">
      {% endif %}
    </div>

    <div class="flex flex-col gap-6 justify-center">
      <div class="text-xs tracking-[0.3em] uppercase text-[#b3262b]">Drop I Edition</div>
      <h1 class="font-serif text-3xl md:text-5xl text-[#e8e0d4] m-0">{{ product.title | default: 'Obsidian Tee' }}</h1>
      <div class="text-xl text-[#d6cdc1]">{{ product.price | default: 6900 | money }}</div>

      <p class="text-base text-[#b7aea3] leading-relaxed m-0">
        {{ product.description | default: '320 GSM heavyweight cotton garment-dyed for maximum hand feel and durability. Drop shoulder oversized drape finished with raised puff crest print.' }}
      </p>

      {% form 'product', product %}
        <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}">
        <div class="flex gap-4 mb-4">
          <div class="text-xs uppercase tracking-widest text-[#9a928a]">Color: <span class="text-[#e8e0d4]">Obsidian</span></div>
        </div>
        <button type="submit" class="w-full ao-btn ao-btn-primary">
          Add to Bag &rarr;
        </button>
      {% endform %}
    </div>
  </div>
</section>
{% schema %}
{
  "name": "Main product",
  "settings": []
}
{% endschema %}
`);

// 27. sections/main-collection.liquid
fs.writeFileSync(path.join(themeDir, 'sections', 'main-collection.liquid'), `<section class="py-12 md:py-20 px-4 md:px-12">
  <div class="ao-container">
    <div class="mb-10 text-center">
      <h1 class="font-serif text-4xl md:text-6xl text-[#e8e0d4] mb-3">{{ collection.title | default: 'All Offerings' }}</h1>
      <p class="text-sm text-[#b7aea3]">{{ collection.description | default: 'Hand-forged garments in limited drop quantities.' }}</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {% for product in collection.products %}
        {% render 'product-card', product: product %}
      {% else %}
        {% for i in (1..4) %}
          <div class="ao-product-card">
            <div class="aspect-square bg-[#161413]">
              <img src="{{ 'p1-tee.jpg' | asset_url }}" class="w-full h-full object-cover">
            </div>
          </div>
        {% endfor %}
      {% endfor %}
    </div>
  </div>
</section>
{% schema %}
{
  "name": "Main collection",
  "settings": []
}
{% endschema %}
`);

// 28. sections/main-cart.liquid, main-search.liquid, main-page.liquid, main-404.liquid
fs.writeFileSync(path.join(themeDir, 'sections', 'main-cart.liquid'), `<section class="py-16 px-4 md:px-12">
  <div class="ao-container max-w-3xl">
    <h1 class="font-serif text-3xl md:text-5xl text-[#e8e0d4] mb-8 text-center">Your Bag</h1>
    <div class="border border-[rgba(232,224,212,0.12)] p-6 bg-[#110f0f]">
      {% if cart.empty? %}
        <div class="text-center py-12">
          <p class="text-[#b7aea3] mb-6">Your bag is currently empty.</p>
          <a href="{{ routes.all_products_collection_url }}" class="ao-btn ao-btn-primary">Browse Drop I &rarr;</a>
        </div>
      {% else %}
        <form action="{{ routes.cart_url }}" method="post">
          {% for item in cart.items %}
            <div class="flex justify-between py-4 border-b border-[rgba(232,224,212,0.08)]">
              <div>{{ item.title }} x {{ item.quantity }}</div>
              <div>{{ item.final_line_price | money }}</div>
            </div>
          {% endfor %}
          <div class="flex justify-between pt-6 text-lg font-serif">
            <span>Subtotal</span>
            <span>{{ cart.total_price | money }}</span>
          </div>
          <button type="submit" name="checkout" class="ao-btn ao-btn-primary w-full mt-6">Checkout &rarr;</button>
        </form>
      {% endif %}
    </div>
  </div>
</section>
{% schema %} { "name": "Main cart" } {% endschema %}
`);

fs.writeFileSync(path.join(themeDir, 'sections', 'main-search.liquid'), `<section class="py-16 px-4 md:px-12">
  <div class="ao-container">
    <h1 class="font-serif text-3xl md:text-5xl text-[#e8e0d4] mb-8 text-center">Search Results</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {% for item in search.results %}
        {% if item.object_type == 'product' %}
          {% render 'product-card', product: item %}
        {% endif %}
      {% endfor %}
    </div>
  </div>
</section>
{% schema %} { "name": "Main search" } {% endschema %}
`);

fs.writeFileSync(path.join(themeDir, 'sections', 'main-page.liquid'), `<section class="py-16 px-4 md:px-12">
  <div class="ao-container max-w-3xl">
    <h1 class="font-serif text-3xl md:text-5xl text-[#e8e0d4] mb-8">{{ page.title }}</h1>
    <div class="prose prose-invert text-[#d6cdc1] leading-relaxed">{{ page.content }}</div>
  </div>
</section>
{% schema %} { "name": "Main page" } {% endschema %}
`);

fs.writeFileSync(path.join(themeDir, 'sections', 'main-404.liquid'), `<section class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
  <div class="text-xs tracking-[0.3em] uppercase text-[#b3262b] mb-4">404 Error</div>
  <h1 class="font-serif text-4xl md:text-6xl text-[#e8e0d4] mb-4">Beyond The Kingdom</h1>
  <p class="text-[#b7aea3] max-w-md mb-8">The coordinate you are looking for has returned to the shadows.</p>
  <a href="{{ routes.root_url }}" class="ao-btn ao-btn-primary">Return to Sanctuary &rarr;</a>
</section>
{% schema %} { "name": "404" } {% endschema %}
`);

// 29. JSON Templates
const indexJson = {
  sections: {
    "announcement-bar": { type: "announcement-bar", settings: {} },
    "hero-banner": { type: "hero-banner", settings: {} },
    "collections-grid": { type: "collections-grid", blocks: {
      "card_1": { type: "collection_card", settings: { title: "Men" } },
      "card_2": { type: "collection_card", settings: { title: "Women" } },
      "card_3": { type: "collection_card", settings: { title: "Unisex" } }
    }, block_order: ["card_1", "card_2", "card_3"] },
    "featured-collection": { type: "featured-collection", settings: { heading: "Bestsellers" } },
    "story-video": { type: "story-video", settings: {} },
    "seven-symbols": { type: "seven-symbols", settings: {} },
    "promo-cards": { type: "promo-cards", settings: {} },
    "customer-reviews-marquee": {
      type: "customer-reviews-marquee",
      settings: {
        kicker: "Voices From The Kingdom",
        heading: "Tested By The Chosen",
        subheading: "Unvarnished impressions from those who wear the symbols and walk their own path.",
        speed_row_1: 42,
        speed_row_2: 48
      },
      blocks: {
        "r1": { type: "review", settings: { row: "1", quote: "The 320 GSM weight is unreal. It holds structure like armor without feeling stiff.", author: "Marcus V.", product_tag: "Obsidian Crown Hoodie", verified: true } },
        "r2": { type: "review", settings: { row: "1", quote: "The wax seal packaging and the lore card made opening this an unforgettable ritual.", author: "Elena R.", product_tag: "Pomegranate Crop Tee", verified: true } },
        "r3": { type: "review", settings: { row: "1", quote: "Subtle puff print detailing that catches light in all the right ways. Instant grail piece.", author: "Julian M.", product_tag: "Obsidian Tee", verified: true } },
        "r4": { type: "review", settings: { row: "1", quote: "Heavyweight cotton drape is supreme. Worth every single penny.", author: "Nathan S.", product_tag: "Thorn Vest", verified: true } },
        "r5": { type: "review", settings: { row: "2", quote: "You can immediately feel this was crafted with true conviction. Dark aesthetic done right.", author: "Soren B.", product_tag: "Heritage Tee", verified: true } },
        "r6": { type: "review", settings: { row: "2", quote: "The Seven Symbols concept gives real meaning to what you are wearing. Outstanding quality.", author: "Kaelen T.", product_tag: "Obsidian Crown Hoodie", verified: true } },
        "r7": { type: "review", settings: { row: "2", quote: "Washed it 5 times and the color depth hasn't shifted an inch. Unmatched craftsmanship.", author: "Rowan H.", product_tag: "Obsidian Tee", verified: true } },
        "r8": { type: "review", settings: { row: "2", quote: "Clean drop-shoulder cut. Gets compliments every single time I step out.", author: "Zane L.", product_tag: "Thorn Vest", verified: true } }
      },
      block_order: ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8"]
    },
    "community-banner": { type: "community-banner", settings: {} },
    "instagram-feed": { type: "instagram-feed", settings: {} }
  },
  order: [
    "announcement-bar",
    "hero-banner",
    "collections-grid",
    "featured-collection",
    "story-video",
    "seven-symbols",
    "promo-cards",
    "customer-reviews-marquee",
    "community-banner",
    "instagram-feed"
  ]
};
fs.writeFileSync(path.join(themeDir, 'templates', 'index.json'), JSON.stringify(indexJson, null, 2));

const productJson = {
  sections: {
    "main-product": { type: "main-product", settings: {} },
    "customer-reviews-marquee": { type: "customer-reviews-marquee", settings: {} }
  },
  order: ["main-product", "customer-reviews-marquee"]
};
fs.writeFileSync(path.join(themeDir, 'templates', 'product.json'), JSON.stringify(productJson, null, 2));

const collectionJson = {
  sections: {
    "main-collection": { type: "main-collection", settings: {} }
  },
  order: ["main-collection"]
};
fs.writeFileSync(path.join(themeDir, 'templates', 'collection.json'), JSON.stringify(collectionJson, null, 2));

const cartJson = {
  sections: {
    "main-cart": { type: "main-cart", settings: {} }
  },
  order: ["main-cart"]
};
fs.writeFileSync(path.join(themeDir, 'templates', 'cart.json'), JSON.stringify(cartJson, null, 2));

const searchJson = {
  sections: {
    "main-search": { type: "main-search", settings: {} }
  },
  order: ["main-search"]
};
fs.writeFileSync(path.join(themeDir, 'templates', 'search.json'), JSON.stringify(searchJson, null, 2));

const pageJson = {
  sections: {
    "main-page": { type: "main-page", settings: {} }
  },
  order: ["main-page"]
};
fs.writeFileSync(path.join(themeDir, 'templates', 'page.json'), JSON.stringify(pageJson, null, 2));

const four04Json = {
  sections: {
    "main-404": { type: "main-404", settings: {} }
  },
  order: ["main-404"]
};
fs.writeFileSync(path.join(themeDir, 'templates', '404.json'), JSON.stringify(four04Json, null, 2));

// 30. config/settings_schema.json and settings_data.json
const settingsSchema = [
  {
    name: "theme_info",
    theme_name: "Ash & Obsidian OS 2.0",
    theme_version: "1.0.0",
    theme_author: "A&O Custom Theme",
    theme_documentation_url: "https://ashandobsidian.com",
    theme_support_url: "https://ashandobsidian.com/contact"
  },
  {
    name: "Logo & Brand",
    settings: [
      {
        type: "image_picker",
        id: "logo",
        label: "Brand Logo"
      },
      {
        type: "range",
        id: "logo_width",
        min: 60,
        max: 320,
        step: 10,
        default: 160,
        unit: "px",
        label: "Logo width"
      },
      {
        type: "image_picker",
        id: "favicon",
        label: "Favicon image"
      }
    ]
  },
  {
    name: "Colors & Styling",
    settings: [
      {
        type: "color",
        id: "color_bg",
        label: "Background",
        default: "#0b0a0a"
      },
      {
        type: "color",
        id: "color_bone",
        label: "Bone text / accents",
        default: "#e8e0d4"
      },
      {
        type: "color",
        id: "color_crimson",
        label: "Crimson / Blood accent",
        default: "#b3262b"
      }
    ]
  }
];
fs.writeFileSync(path.join(themeDir, 'config', 'settings_schema.json'), JSON.stringify(settingsSchema, null, 2));

const settingsData = {
  current: {
    color_bg: "#0b0a0a",
    color_bone: "#e8e0d4",
    color_crimson: "#b3262b"
  }
};
fs.writeFileSync(path.join(themeDir, 'config', 'settings_data.json'), JSON.stringify(settingsData, null, 2));

// 31. locales/en.default.json
const enLocale = {
  accessibility: {
    skip_to_text: "Skip to content",
    close: "Close"
  },
  cart: {
    title: "Your Bag",
    empty: "Your bag is empty",
    subtotal: "Subtotal",
    checkout: "Checkout"
  }
};
fs.writeFileSync(path.join(themeDir, 'locales', 'en.default.json'), JSON.stringify(enLocale, null, 2));

// 32. Copy all assets from /public/assets into /shopify-theme/assets
const publicAssets = path.join(publicDir, 'assets');
if (fs.existsSync(publicAssets)) {
  fs.readdirSync(publicAssets).forEach(f => {
    // Only copy images and fonts into shopify theme assets (exclude large video if over 10mb for fast theme install, or include poster + video)
    // Shopify theme uploads have 50MB limit, 16MB video fits inside 50MB, but let's copy all!
    fs.copyFileSync(path.join(publicAssets, f), path.join(themeDir, 'assets', f));
  });
}

console.log('All theme files written. Now packing ZIP file...');

// 33. Package the Shopify Theme ZIP file using JSZip
async function packZip() {
  const zip = new JSZip();

  function addDirToZip(zipFolder, diskPath) {
    const files = fs.readdirSync(diskPath);
    for (const file of files) {
      const fullPath = path.join(diskPath, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        const subFolder = zipFolder.folder(file);
        addDirToZip(subFolder, fullPath);
      } else {
        const data = fs.readFileSync(fullPath);
        zipFolder.file(file, data);
      }
    }
  }

  // Add the root theme directories (layout, templates, sections, snippets, assets, config, locales) at the root of the ZIP
  ['layout', 'templates', 'sections', 'snippets', 'assets', 'config', 'locales'].forEach(d => {
    const dirPath = path.join(themeDir, d);
    if (fs.existsSync(dirPath)) {
      const folder = zip.folder(d);
      addDirToZip(folder, dirPath);
    }
  });

  const zipBuffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: { level: 6 } });
  const zipPath = path.join(publicDir, 'a-and-o-shopify-theme.zip');
  fs.writeFileSync(zipPath, zipBuffer);
  console.log('Successfully generated installable theme ZIP:', zipPath, 'Size:', zipBuffer.length);
}

packZip().catch(console.error);
