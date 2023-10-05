import sitemap from '@astrojs/sitemap';
import remarkAlertBlocks from '@lucjosin/remark-alert-blocks';
import compress from 'astro-compress';
import astroExpressiveCode from 'astro-expressive-code';
import { defineConfig } from 'astro/config';
import { s } from 'hastscript';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkCollapse from 'remark-collapse';
import numberedFootnoteLabels from 'remark-numbered-footnote-labels';
import remarkToc from 'remark-toc';

import remarkCodeHighlight from '@lucjosin/remark-code-highlight';
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
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: {
            class: 'autolink-header',
            ariaHidden: true,
            tabIndex: -1,
          },
          content: [
            s(
              'svg.autolink-svg',
              {
                xmlns: 'http://www.w3.org/2000/svg',
                width: 18,
                height: 18,
                marginLeft: '1rem',
                fill: 'currentColor',
                viewBox: '0 0 24 24',
              },
              s('path', {
                d: 'M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992 5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242 6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985 3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005 3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201 13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995 2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0 0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836 19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997 0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632 1.563 1 1 0 0 0 1.602-1.198z',
              })
            ),
          ],
        },
      ],
    ],
    remarkPlugins: [
      numberedFootnoteLabels,
      remarkAlertBlocks,
      remarkCodeHighlight,
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
