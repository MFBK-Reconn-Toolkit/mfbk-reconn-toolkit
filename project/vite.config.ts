import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    // Enable React Fast Refresh in development
    fastRefresh: process.env.NODE_ENV !== 'production',
  })],
  
  // Remove base path for root domain deployment
  base: '/',
  
  // Optimization settings
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom', 'react-icons'],
  },
  
  // Build optimizations for production
  build: {
    // Enable source maps for debugging (but keep them separate)
    sourcemap: true,
    
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'icons': ['react-icons'],
          
          // Component chunks
          'components': ['./src/components/ReconDashboard.tsx'],
          'services': ['./src/services/api.ts'],
        },
        
        // Optimize chunk file names
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const extType = info[info.length - 1];
          
          // Organize assets by type
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name || '')) {
            return `images/[name]-[hash][extname]`;
          }
          if (/\.(css)$/i.test(assetInfo.name || '')) {
            return `css/[name]-[hash][extname]`;
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/i.test(assetInfo.name || '')) {
            return `fonts/[name]-[hash][extname]`;
          }
          
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    
    // Use esbuild for better compatibility
    minify: 'esbuild',
    
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
    
    // Enable CSS code splitting
    cssCodeSplit: true,
    
    // Asset optimization
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
  },
  
  // ESBuild options for production
  esbuild: {
    // Remove console logs and debugger in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
  
  // Development server settings
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
  
  // Environment variables
  define: {
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || 'http://localhost:8000'),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  
  // Resolve optimizations
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@services': '/src/services',
    },
  },
  
  // CSS optimizations
  css: {
    devSourcemap: true,
  },
});
