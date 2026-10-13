// Shim window.fetch to allow getter and setter in iframe environments with extensions
try {
  const origFetch = window.fetch ? window.fetch.bind(window) : undefined;
  let curFetch = origFetch;
  Object.defineProperty(window, 'fetch', {
    get() {
      return curFetch;
    },
    set(newFetch) {
      curFetch = newFetch;
    },
    configurable: true,
    enumerable: true,
  });
} catch (_) {
  // Ignore descriptor errors
}

// Suppress extension errors
window.addEventListener('error', (e) => {
  if (
    (e.filename && e.filename.includes('chrome-extension://')) ||
    (e.message &&
      (e.message.includes('Cannot set property fetch') ||
        e.message.includes('frame_ant')))
  ) {
    e.stopImmediatePropagation();
    e.preventDefault();
    return true;
  }
}, true);

import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
