import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const env = loadEnv(process.cwd(), "");

// https://vite.dev/config/
export default defineConfig({
  
  plugins: [react(),
     tailwindcss(),
  ],
  server: {
    proxy :{
      "/api": {
        target : env.VITE_API_URL,
        // target: "http://localhost:5000",
        changeOrigin : true,
        secure: false,
      }
    }
  },

})
