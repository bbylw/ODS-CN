// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// 部署域名变更时同步修改 site（用于 sitemap / canonical / OG）
// https://astro.build/config
export default defineConfig({
  site: 'https://ods.ndjp.net',
  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});