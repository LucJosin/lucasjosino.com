import { defineConfig } from 'astro/config';
import { s } from 'hastscript';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import { pluginFileIcons } from '@xt0rted/expressive-code-file-icons';
import compress from 'astro-compress';
import astroExpressiveCode from 'astro-expressive-code';
import icon from 'astro-icon';
import astroMetaTags from 'astro-meta-tags';
import rename from 'astro-rename';
import robotsTxt from 'astro-robots-txt';

import responsiveTables from '@adapttive/remark-responsive-tables';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import remarkCollapse from 'remark-collapse';
import remarkDirective from 'remark-directive';
import remarkLinkCard from 'remark-link-card-plus';
import numberedFootnoteLabels from 'remark-numbered-footnote-labels';
import remarkToc from 'remark-toc';
import remarkAlertBlocks from './plugins/remark-alert-blocks';
import remarkCodeSet from './plugins/remark-code-set';
import remarkGitHubCard from './plugins/remark-github-card';
import remarkImageCaption from './plugins/remark-image-caption';
import remarkMention from './plugins/remark-mention';
import remarkSlider from './plugins/remark-slider';
import remarkTextHighlight from './plugins/remark-text-highlight';

import { defaultLocale, explicitLocales, locales } from './src/i18n/config';
import HashRenamer from './src/lib/hash-renamer';
import getRedirects from './src/lib/redirects';

const cssPrefix = 'astro-';
const renamer = new HashRenamer(cssPrefix);
const exceptions = [
  // Global
  'details',
  'show',

  // Giscus
  'giscus',

  // Expressive code
  'expressive-code',
  'frame',
  'header',
  'is-terminal',
];

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
  // Specify a mapping of redirects where the key is the route to match and the value is the path to redirect to.
  redirects: getRedirects(),
  // Configures i18n routing
  i18n: {
    defaultLocale: defaultLocale,
    locales: locales,
  },
  // Set the route matching behavior
  trailingSlash: 'always',
  // Build Options
  build: {
    // Control the output file format of each page.
    format: 'directory',
  },
  // Astro integrations.
  //
  // Ref: https://docs.astro.build/en/guides/integrations-guide/
  // Ref: https://docs.astro.build/en/guides/integrations-guide/sitemap/
  integrations: [
    astroExpressiveCode({
      themes: ['dark-plus', 'light-plus'],
      useDarkModeMediaQuery: true,
      themeCssSelector: (theme) =>
        `[data-theme='${theme.name.replace('-plus', '')}']`,
      plugins: [
        pluginLineNumbers(),
        pluginFileIcons({
          iconClass: 'expressive-code-icon',
          titleClass: 'expressive-code-title',
        }),
      ],
    }),
    astroMetaTags(),
    icon(),
    rename({
      rename: {
        strategy: (key) => renamer.rename(key),
        except: exceptions,
      },
    }),
    sitemap({
      i18n: {
        defaultLocale: defaultLocale,
        locales: explicitLocales,
      },
    }),
    robotsTxt({
      sitemap: true,
    }),
    compress(),
    react(),
  ],
  // Markdown configuration
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeExternalLinks,
        {
          rel: 'noopener noreferrer',
          target: '_blank',
          content: [
            s(
              'svg.external-links',
              {
                xmlns: 'http://www.w3.org/2000/svg',
                width: 16,
                height: 16,
                marginLeft: '1rem',
                fill: 'currentColor',
                viewBox: '0 0 24 24',
              },
              s('path', {
                d: 'M14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7Z',
              })
            ),
          ],
        },
      ],
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
      remarkDirective,
      remarkMention,
      remarkLinkCard,
      remarkGitHubCard,
      numberedFootnoteLabels,
      remarkAlertBlocks,
      remarkTextHighlight,
      remarkSlider,
      remarkImageCaption,
      responsiveTables,
      remarkCodeSet,
      [
        remarkToc,
        {
          heading: 'Summary|Sumário',
        },
      ],
      [
        remarkCollapse,
        {
          test: 'Summary|Sumário',
          summary: (str) => {
            return str === 'Summary' ? 'Show content' : 'Mostrar conteúdo';
          },
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
      external: ['svgo', '@resvg/resvg-js'],
    },
    // Fix 'resvg' on dev mode
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
      esbuildOptions: { target: 'esnext' },
    },
    build: { rollupOptions: { external: ['@resvg/resvg-js'] } },
  },
  // Listen on all addresses, including LAN and public addresses.
  //
  // Ref: https://docs.astro.build/en/reference/configuration-reference/#serverhost
  server: {
    host: true,
  },
  // Astro offers experimental flags to give users early access to new features.
  // These flags are not guaranteed to be stable.
  experimental: {
    // Enables a more reliable strategy to prevent scripts from being
    // executed in pages where they are not used.
    //
    // https://docs.astro.build/en/reference/configuration-reference/#experimentaldirectrenderscript
    directRenderScript: true,
  },
});
