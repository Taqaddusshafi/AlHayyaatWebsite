import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import ViteSitemap from 'vite-plugin-sitemap'

const routes = [
  '/',
  '/doctors',
  '/services',
  '/contact',
  '/about',
]

export default defineConfig({
  plugins: [
    react(),
    ViteSitemap({
      hostname: 'https://alhayyaat.com', // Replace with your actual domain
      dynamicRoutes: routes,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date(),
      robots: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
