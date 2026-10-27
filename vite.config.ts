import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/** Preload only the Latin display + body font files so text paints without waiting for CSS-discovered requests. */
function preloadFonts(): Plugin {
  return {
    name: 'preload-latin-fonts',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const files = Object.keys(ctx.bundle ?? {}).filter((f) => /(plus-jakarta-sans|nunito-sans)-latin-wght-normal.*\.woff2$/.test(f));
        const tags = files.map((f) => ({ tag: 'link', attrs: { rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: '', href: '/' + f }, injectTo: 'head' as const }));
        return { html, tags };
      },
    },
  };
}

export default defineConfig({ plugins: [react(), preloadFonts()] });
