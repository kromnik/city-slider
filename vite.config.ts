import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    svgr({
      svgrOptions: { exportType: 'default', ref: true, svgo: false, titleProp: true },
      include: '**/*.svg',
    }),
  ],
  base: process.env.NODE_ENV === 'production' ? '/city-slider/' : '/',
  server: {
    open: true,
  },
  // css: {
  //   preprocessorOptions: {
  //       scss: {
  //           additionalData: '@use "/src/styles/variables/_global.scss" as *;',
  //       },
  //   },
  // },
})
