import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Your final, deployed URL.
  //
  // Astro uses this full URL to generate your sitemap
  // and canonical URLs in your final build.
  site: "https://www.my-site.dev",
  // Specifies the output target for builds.s
  //
  // ‘static’ - Building a static site to be deploy to any static host.
  output: "static",
  // Astro sitemap.
  //
  // Ref: https://docs.astro.build/en/guides/integrations-guide/sitemap/
  integrations: [sitemap()],
});
