import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    // Remove console and debugger in production
    drop: ['console', 'debugger'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'mantine-vendor': ['@mantine/core', '@mantine/hooks', '@mantine/notifications'],
          'query-vendor': ['@tanstack/react-query'],
          'icons-vendor': ['@tabler/icons-react'],
          'utils-vendor': ['zustand', '@faker-js/faker'],
        },
      },
    },
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 600,
    // Enable minification (esbuild is faster than terser)
    minify: 'esbuild',
    // Enable source maps for production debugging (optional, can disable for smaller builds)
    sourcemap: false,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@mantine/core',
      '@mantine/hooks',
      '@tanstack/react-query',
    ],
  },
})
