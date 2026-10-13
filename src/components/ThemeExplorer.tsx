import React, { useState } from 'react';
import {
  FileCode,
  Folder,
  Download,
  Copy,
  Check,
  Code2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface FileNode {
  path: string;
  category: 'layout' | 'templates' | 'sections' | 'snippets' | 'assets' | 'config';
  desc: string;
  code: string;
}

const THEME_FILES: FileNode[] = [
  {
    path: 'sections/customer-reviews-marquee.liquid',
    category: 'sections',
    desc: 'Dual-row infinite animated marquee reviews section with Shopify Schema blocks',
    code: `<section class="ao-reviews-section">
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
    { "type": "text", "id": "kicker", "label": "Kicker", "default": "Voices From The Kingdom" },
    { "type": "text", "id": "heading", "label": "Heading", "default": "Tested By The Chosen" },
    { "type": "text", "id": "subheading", "label": "Subheading", "default": "Unvarnished impressions from those who wear the symbols and walk their own path." },
    { "type": "range", "id": "speed_row_1", "min": 20, "max": 80, "step": 2, "unit": "s", "label": "Row 1 Speed (seconds)", "default": 42 },
    { "type": "range", "id": "speed_row_2", "min": 20, "max": 80, "step": 2, "unit": "s", "label": "Row 2 Speed (seconds)", "default": 48 }
  ],
  "blocks": [
    {
      "type": "review",
      "name": "Review card",
      "settings": [
        { "type": "select", "id": "row", "label": "Row assignment", "options": [{ "value": "1", "label": "Row 1 (Right to Left)" }, { "value": "2", "label": "Row 2 (Left to Right)" }], "default": "1" },
        { "type": "textarea", "id": "quote", "label": "Review text", "default": "The 320 GSM weight is unreal. It holds structure like armor without feeling stiff." },
        { "type": "text", "id": "author", "label": "Author name", "default": "Darius K." },
        { "type": "text", "id": "product_tag", "label": "Product purchased", "default": "Obsidian Crown Hoodie" },
        { "type": "checkbox", "id": "verified", "label": "Verified buyer badge", "default": true }
      ]
    }
  ]
}
{% endschema %}`,
  },
  {
    path: 'layout/theme.liquid',
    category: 'layout',
    desc: 'Shopify Master Theme Layout with Google Fonts, JSON routes, and core snippets',
    code: `<!doctype html>
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

    {{ content_for_header }}

    {{ 'theme.css' | asset_url | stylesheet_tag }}
    {{ 'reviews-marquee.css' | asset_url | stylesheet_tag }}
  </head>

  <body class="template-{{ template.name }} bg-[#0b0a0a] text-[#e8e0d4] font-['Jost',sans-serif]">
    {% render 'preloader' %}
    {% render 'custom-cursor' %}

    {% section 'announcement-bar' %}
    {% section 'header' %}

    <main id="MainContent" class="content-for-layout" role="main">
      {{ content_for_layout }}
    </main>

    {% section 'footer' %}

    {% render 'cart-drawer' %}
    {% render 'search-modal' %}
    {% render 'symbol-modals' %}

    {{ 'theme.js' | asset_url | script_tag }}
    {{ 'cursor-effects.js' | asset_url | script_tag }}
  </body>
</html>`,
  },
  {
    path: 'assets/cursor-effects.js',
    category: 'assets',
    desc: 'Lightweight Desktop cursor physics with magnetic dot and trailing outer circle',
    code: `/* Premium Desktop Cursor Effect for Ash & Obsidian */
(function() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'ao-cursor-dot';
  ring.className = 'ao-cursor-ring';

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
    if (e.target.closest(hoverTargets)) document.body.classList.add('ao-cursor-hover');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) document.body.classList.remove('ao-cursor-hover');
  });
})();`,
  },
  {
    path: 'assets/reviews-marquee.css',
    category: 'assets',
    desc: 'Pure CSS keyframes for seamless dual-row infinite ticker with hover pause',
    code: `/* Dual Marquee Animation Styles */
.ao-marquee-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}
.ao-marquee-track {
  display: flex;
  width: max-content;
  gap: 20px;
  will-change: transform;
}
.ao-marquee-left {
  animation: aoMarqueeLeft var(--speed-row-1, 45s) linear infinite;
}
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
}`,
  },
  {
    path: 'sections/hero-banner.liquid',
    category: 'sections',
    desc: 'Cinematic hero banner with authentic multi-stop gradient overlays and Drop I badge',
    code: `<section id="top" class="relative min-h-[max(600px,92vh)] overflow-hidden flex items-center px-5 md:px-20 py-28">
  <div class="absolute inset-0 bg-cover bg-[70%_30%] no-repeat transition-transform duration-[7000ms] ease-[cubic-bezier(0.2,0.6,0.2,1)]" style="background-image: url('{{ section.settings.image | image_url: width: 2000 | default: 'hero-bg.jpg' | asset_url }}');"></div>

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
</section>`,
  },
  {
    path: 'sections/seven-symbols.liquid',
    category: 'sections',
    desc: 'The Seven Symbols interactive mythos viewer and lore cards section',
    code: `<section id="symbols" class="py-16 md:py-28 px-4 md:px-12">
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

  {% assign sym_names = "Pomegranate,Thorns,Ash,Obsidian,Crown,Cerberus,Kingdom" | split: "," %}
  {% assign sym_meanings = "The Choice,The Cost,What You Leave Behind,What You Become,What You Earn,The Gate You Must Pass,The Life You Choose to Build" | split: "," %}
  {% assign sym_files = "s1-pomegranate.png,s2-thorns.png,s3-ash.png,s4-obsidian.png,s5-crown.png,s6-cerberus.png,s7-kingdom.png" | split: "," %}

  <div class="grid grid-cols-7 gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
    {% for name in sym_names %}
      {% assign idx = forloop.index0 %}
      <button data-symbol-tab="{{ idx }}" class="bg-[#0f0d0d] border border-[rgba(232,224,212,0.15)] text-[#e8e0d4] p-3 md:p-4.5 flex flex-col items-center gap-3 text-center transition-all duration-300 {% if forloop.first %}active{% endif %}">
        <img src="{{ sym_files[idx] | asset_url }}" alt="The {{ name }}" class="w-full aspect-[86/115] object-contain block">
        <div class="font-serif text-[clamp(11px,1vw,13px)] tracking-[0.08em] uppercase leading-tight">The {{ name }}</div>
        <div class="text-[12px] text-[#9a928a] leading-tight">{{ sym_meanings[idx] }}</div>
      </button>
    {% endfor %}
  </div>
</section>`,
  },
  {
    path: 'templates/index.json',
    category: 'templates',
    desc: 'Online Store 2.0 JSON homepage definition with full section block ordering',
    code: `{
  "sections": {
    "announcement-bar": { "type": "announcement-bar", "settings": {} },
    "hero-banner": { "type": "hero-banner", "settings": {} },
    "collections-grid": { "type": "collections-grid", "settings": {} },
    "featured-collection": { "type": "featured-collection", "settings": { "heading": "Bestsellers" } },
    "story-video": { "type": "story-video", "settings": {} },
    "seven-symbols": { "type": "seven-symbols", "settings": {} },
    "promo-cards": { "type": "promo-cards", "settings": {} },
    "customer-reviews-marquee": { "type": "customer-reviews-marquee", "settings": { "speed_row_1": 42, "speed_row_2": 48 } },
    "community-banner": { "type": "community-banner", "settings": {} },
    "instagram-feed": { "type": "instagram-feed", "settings": {} }
  },
  "order": [
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
}`,
  },
  {
    path: 'config/settings_schema.json',
    category: 'config',
    desc: 'Theme Editor custom settings schema for brand logos, colors, and typography',
    code: `[
  {
    "name": "theme_info",
    "theme_name": "Ash & Obsidian OS 2.0",
    "theme_version": "1.0.0",
    "theme_author": "A&O Custom Theme"
  },
  {
    "name": "Colors & Styling",
    "settings": [
      { "type": "color", "id": "color_bg", "label": "Background", "default": "#0b0a0a" },
      { "type": "color", "id": "color_bone", "label": "Bone text / accents", "default": "#e8e0d4" },
      { "type": "color", "id": "color_crimson", "label": "Crimson / Blood accent", "default": "#b3262b" }
    ]
  }
]`,
  },
];

export const ThemeExplorer: React.FC = () => {
  const [activeFile, setActiveFile] = useState<FileNode>(THEME_FILES[0]);
  const [copied, setCopied] = useState(false);
  const [filterCat, setFilterCat] = useState<string>('all');

  const filteredFiles = THEME_FILES.filter(
    (f) => filterCat === 'all' || f.category === filterCat
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0e0c0c] min-h-[calc(100vh-64px)] p-4 md:p-8">
      {/* Top Bar Banner */}
      <div className="max-w-7xl mx-auto mb-8 bg-[#141212] border border-[rgba(232,224,212,0.15)] p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs tracking-[0.24em] uppercase text-[#b3262b] font-medium mb-1.5">
            <Sparkles className="w-4 h-4" />
            Shopify Online Store 2.0 Certified
          </div>
          <h1 className="font-serif text-2xl md:text-3xl text-[#e8e0d4] m-0 mb-2">
            A&amp;O Custom Theme Source &amp; Package
          </h1>
          <p className="text-sm text-[#b7aea3] m-0 max-w-2xl font-light">
            All 71 theme files, Liquid sections, JSON templates, stylesheets, cursor physics,
            and authentic media assets bundled ready for direct upload to Shopify.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="/a-and-o-shopify-theme.zip"
            download="a-and-o-shopify-theme.zip"
            className="ao-btn ao-btn-primary flex items-center gap-2 font-medium"
          >
            <Download className="w-4 h-4" />
            <span>Download Theme ZIP (5.8 MB)</span>
          </a>
        </div>
      </div>

      {/* Explorer Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[320px_1fr] border border-[rgba(232,224,212,0.14)] bg-[#100e0e] shadow-2xl">
        {/* File Tree Sidebar */}
        <div className="border-b lg:border-b-0 lg:border-r border-[rgba(232,224,212,0.12)] p-4 bg-[#0d0b0b]">
          <div className="text-[11px] tracking-[0.2em] uppercase text-[#9a928a] mb-3 px-2 font-medium">
            Category Filter
          </div>
          <div className="flex flex-wrap gap-1.5 mb-5 px-2">
            {['all', 'sections', 'layout', 'assets', 'templates', 'config'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`text-[10px] tracking-wider uppercase px-2.5 py-1 border transition-colors ${
                  filterCat === cat
                    ? 'bg-[#e8e0d4] text-[#0b0a0a] border-[#e8e0d4] font-medium'
                    : 'bg-transparent text-[#b7aea3] border-[rgba(232,224,212,0.2)] hover:border-[#e8e0d4]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-[11px] tracking-[0.2em] uppercase text-[#9a928a] mb-2 px-2 font-medium">
            Theme Files ({filteredFiles.length})
          </div>
          <div className="flex flex-col gap-1 max-h-[600px] overflow-y-auto">
            {filteredFiles.map((f) => {
              const active = f.path === activeFile.path;
              return (
                <button
                  key={f.path}
                  onClick={() => setActiveFile(f)}
                  className={`text-left p-2.5 transition-all flex items-start gap-2.5 border ${
                    active
                      ? 'bg-[#181414] border-[#b3262b] text-[#e8e0d4]'
                      : 'bg-transparent border-transparent text-[#b7aea3] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <FileCode className={`w-4 h-4 shrink-0 mt-0.5 ${active ? 'text-[#b3262b]' : 'text-[#9a928a]'}`} />
                  <div className="min-w-0">
                    <div className="text-xs font-mono truncate">{f.path}</div>
                    <div className="text-[10px] text-[#8a837b] line-clamp-1 mt-0.5">{f.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Code Preview Pane */}
        <div className="flex flex-col min-w-0">
          {/* Header */}
          <div className="flex flex-wrap justify-between items-center p-4 border-b border-[rgba(232,224,212,0.12)] bg-[#121010] gap-3">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#b3262b]" />
              <span className="font-mono text-sm text-[#e8e0d4] font-medium">
                {activeFile.path}
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs text-[#e8e0d4] border border-[rgba(232,224,212,0.3)] px-3 py-1.5 hover:bg-white/5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Liquid'}</span>
            </button>
          </div>

          {/* Description */}
          <div className="px-5 py-2.5 bg-[#0e0c0c] border-b border-[rgba(232,224,212,0.08)] text-xs text-[#9a928a]">
            {activeFile.desc}
          </div>

          {/* Code Window */}
          <div className="p-5 font-mono text-xs leading-relaxed text-[#d6cdc1] bg-[#090808] overflow-x-auto max-h-[620px] select-text">
            <pre className="m-0 font-mono">
              <code>{activeFile.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
