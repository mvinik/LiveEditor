import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: ['..'] // Allows accessing files one level up from project root
    }
  }
})


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: '0.0.0.0', // Accessible on all network interfaces
//     port: 5173,
//     strictPort: true, // Don't try other ports if 5173 is taken
//     hmr: {
//       protocol: 'ws',
//       host: 'localhost',
//       port: 5173,
//       clientPort: 5173
//     },
//     watch: {
//       usePolling: true // Essential for Docker/WSL2 environments
//     },
//     fs: {
//       allow: ['..'] // Allow accessing parent directories
//     },
//     cors: true, // Enable CORS for development
//     proxy: { // Optional: Proxy API requests to avoid CORS issues
//       '/api': {
//         target: 'http://localhost:1337', // Your Strapi URL
//         changeOrigin: true,
//         secure: false
//       }
//     }
//   },
//   preview: {
//     port: 5173,
//     strictPort: true
//   }
// });