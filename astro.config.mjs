import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import { defineConfig } from 'astro/config';

import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  // Your final, deployed URL.
  //
  // Astro uses this full URL to generate your sitemap
  // and canonical URLs in your final build.
  site: 'https://www.lucasjosino.com',
  // Specifies the output target for builds.
  //
  // ‘static’ - Building a static site to be deploy to any static host.
  output: 'static',
  // Astro sitemap.
  //
  // Ref: https://docs.astro.build/en/guides/integrations-guide/sitemap/
  integrations: [sitemap(), robotsTxt({sitemap: false}), compress()],
  // Astro icon.
  //
  // Ref: https://github.com/natemoo-re/astro-icon#setup
  vite: {
    ssr: {
      external: ['svgo']
    }
  },
  // Listen on all addresses, including LAN and public addresses.
  //
  // Ref: https://docs.astro.build/en/reference/configuration-reference/#serverhost
  server: {
    host: true
  }
});