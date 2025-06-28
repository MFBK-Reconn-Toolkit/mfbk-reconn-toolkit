import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register Service Worker for performance optimization
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Performance optimization: Preload critical resources
const preloadCriticalResources = () => {
  // Preload critical images
  const logoImage = new Image();
  logoImage.src = '/img.png';
  
  const faviconImage = new Image();
  faviconImage.src = '/favicon.png';
};

// Initialize performance optimizations
preloadCriticalResources();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
