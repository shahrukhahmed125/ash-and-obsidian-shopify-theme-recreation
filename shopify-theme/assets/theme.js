/* Ash & Obsidian — Storefront Interactivity */
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
