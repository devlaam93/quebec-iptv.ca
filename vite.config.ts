import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { imagetools } from "vite-imagetools";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    imagetools({
      defaultDirectives: (url) => {
        // Auto-generate WebP for jpg/png images when ?webp is added
        if (url.searchParams.has('webp')) {
          return new URLSearchParams({
            format: 'webp',
            quality: '80',
          });
        }
        // Auto-optimize images with ?optimize
        if (url.searchParams.has('optimize')) {
          return new URLSearchParams({
            format: 'webp',
            quality: '85',
            effort: '6',
          });
        }
        return new URLSearchParams();
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Keep images organized
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(assetInfo.name || '')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
}));
