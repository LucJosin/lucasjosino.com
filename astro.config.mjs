import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import astroExpressiveCode from 'astro-expressive-code';
import { defineConfig } from 'astro/config';
import remarkCollapse from 'remark-collapse';
import remarkToc from 'remark-toc';
import { paragraphCustomAlerts } from '@hashicorp/remark-plugins';

import robotsTxt from 'astro-robots-txt';

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
  // Astro integrations.
  //
  // Ref: https://docs.astro.build/en/guides/integrations-guide/
  // Ref: https://docs.astro.build/en/guides/integrations-guide/sitemap/
  integrations: [
    // swup({
    //   theme: 'fade',
    //   accessibility: false,
    //   cache: false,
    // }),
    sitemap(),
    robotsTxt({ sitemap: false }),
    compress(),
    astroExpressiveCode(),
  ],
  // Markdown configuration
  markdown: {
    remarkPlugins: [
      paragraphCustomAlerts,
      remarkToc,
      [
        remarkCollapse,
        {
          test: 'Table of contents',
        },
      ],
    ],
    extendDefaultPlugins: true,
  },
  // Astro icon.
  //
  // Ref: https://github.com/natemoo-re/astro-icon#setup
  vite: {
    ssr: {
      external: ['svgo'],
    },
  },
  // Listen on all addresses, including LAN and public addresses.
  //
  // Ref: https://docs.astro.build/en/reference/configuration-reference/#serverhost
  server: {
    host: true,
  },
});
