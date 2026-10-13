import React, { useState } from 'react';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { ParticleEffect } from './components/ParticleEffect';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CollectionsGrid } from './components/CollectionsGrid';
import { FeaturedProducts } from './components/FeaturedProducts';
import { StoryVideo } from './components/StoryVideo';
import { SevenSymbols } from './components/SevenSymbols';
import { PromoCards } from './components/PromoCards';
import { CustomerReviewsMarquee } from './components/CustomerReviewsMarquee';
import { FAQSection } from './components/FAQSection';
import { CommunityBanner } from './components/CommunityBanner';
import { InstagramFeed } from './components/InstagramFeed';
import { Footer } from './components/Footer';
import { StickyContactWidget } from './components/StickyContactWidget';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { InfoModal } from './components/InfoModal';
import { ThemeExplorer } from './components/ThemeExplorer';
import { ThemeGuideModal } from './components/ThemeGuideModal';
import { PRODUCTS, Product } from './data/storeData';

export default function App() {
  const [theme] = useState<'dark' | 'light'>('dark');
  const isLight = theme === 'light';

  // App views
  const [activeTab, setActiveTab] = useState<'storefront' | 'theme-code'>('storefront');
  const [viewportMode, setViewportMode] = useState<'full' | '1440' | '768' | '390'>('full');
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Storefront Interactive State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      key: 'p1_black_L',
      product: PRODUCTS[0],
      size: 'L',
      color: 'black',
      qty: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Toast trigger
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Add to cart
  const handleAddToCart = (product: Product, size: string, color: string) => {
    const key = `${product.id}_${color}_${size}`;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { key, product, size, color, qty: 1 }];
    });
    showToast(`${product.name} · ${size} added to bag`);
  };

  // Update item quantity
  const handleUpdateQty = (key: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => {
          if (i.key === key) {
            const newQty = i.qty + delta;
            return newQty > 0 ? { ...i, qty: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove item
  const handleRemoveItem = (key: string) => {
    setCartItems((prev) => prev.filter((i) => i.key !== key));
  };

  // Navigation scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.qty, 0);

  // Calculate viewport container classes
  const getViewportWidth = () => {
    switch (viewportMode) {
      case '390':
        return 'max-w-[390px] mx-auto shadow-2xl border-x border-[rgba(232,224,212,0.2)]';
      case '768':
        return 'max-w-[768px] mx-auto shadow-2xl border-x border-[rgba(232,224,212,0.2)]';
      case '1440':
        return 'max-w-[1440px] mx-auto shadow-2xl border-x border-[rgba(232,224,212,0.12)]';
      default:
        return 'w-full';
    }
  };

  return (
    <div className={`min-h-screen relative flex flex-col font-['Jost',sans-serif] transition-colors duration-300 ${
      isLight ? 'bg-[#f7f5ef] text-[#141212]' : 'bg-[#070606] text-[#e8e0d4]'
    }`}>
      {/* Preloader & Desktop Custom Cursor */}
      <Preloader />
      <CustomCursor />

      {/* Main Tab Views */}
      {activeTab === 'theme-code' ? (
        <ThemeExplorer />
      ) : (
        <>
        <main className={`flex-1 transition-all duration-300 ${getViewportWidth()}`}>
          {/* Header & Announcement Bar */}
          <Header
            cartCount={totalCartCount}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenModal={(modalKey) => setActiveModal(modalKey)}
            onNavigate={(id) => scrollToSection(id)}
            theme={theme}
          />

          {/* Hero Banner with Original Imagery and Gradients */}
          <Hero
            onShopClick={() => scrollToSection('shop')}
            onStoryClick={() => scrollToSection('about')}
          />

          {/* Collections Grid with Interactive Framing Adjuster */}
          <CollectionsGrid
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              scrollToSection('shop');
            }}
          />

          {/* Featured Collection: Bestsellers */}
          <FeaturedProducts
            activeCategory={activeCategory}
            onFilterChange={(cat) => setActiveCategory(cat)}
            onAddToCart={handleAddToCart}
          />

          {/* Story Loop Video Section */}
          <StoryVideo onExploreClick={() => scrollToSection('symbols')} />

          {/* The Seven Symbols Showcase */}
          <SevenSymbols />

          {/* 2-Column Promo Feature Cards */}
          <PromoCards
            onOpenDetails={() => setActiveModal('details')}
            onOpenPackaging={() => setActiveModal('packaging')}
          />

          {/* SPECIAL REQUIREMENT: Dual-row Animated Customer Reviews Marquee */}
          <CustomerReviewsMarquee isLight={isLight} />

          {/* Frequently Asked Questions Section */}
          <FAQSection
            isLight={isLight}
            onContactClick={() => {
              const widgetBtn = document.querySelector('[aria-label="Toggle concierge options"]') as HTMLButtonElement;
              if (widgetBtn) widgetBtn.click();
              showToast('Connecting with Sanctuary Concierge...');
            }}
          />

          {/* Community Inner Circle Section */}
          <CommunityBanner onJoinClick={() => scrollToSection('footer')} />

          {/* Instagram Community Feed */}
          <InstagramFeed onFollowClick={() => showToast('@ashandobsidian')} />

          {/* Authentic Footer */}
          <Footer
            onNavigate={(id) => scrollToSection(id)}
            onOpenDetails={() => setActiveModal('details')}
            onToast={showToast}
          />
        </main>
        <ParticleEffect isLight={isLight} />
        </>
      )}

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setActiveModal('checkout');
        }}
        onShopClick={() => scrollToSection('shop')}
      />

      {/* Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => {
          setActiveCategory('All');
          scrollToSection('shop');
          showToast(`Selected ${p.name}`);
        }}
      />

      {/* Details & Packaging Modals */}
      <InfoModal
        modalKey={activeModal}
        onClose={() => setActiveModal(null)}
      />

      {/* Theme Setup & Installation Guide Modal */}
      <ThemeGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Sticky WhatsApp, Direct Phone Call & Concierge Widget */}
      <StickyContactWidget isLight={isLight} onToast={showToast} />

      {/* Subtle Toast Notification */}
      <div
        className={`fixed left-1/2 bottom-7 z-[100] -translate-x-1/2 bg-[#e8e0d4] text-[#0b0a0a] px-5 py-3 text-xs tracking-[0.14em] uppercase font-sans font-medium pointer-events-none transition-all duration-400 ease-[cubic-bezier(0.2,0.7,0.2,1)] shadow-2xl ${
          toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {toastMessage}
      </div>
    </div>
  );
}
