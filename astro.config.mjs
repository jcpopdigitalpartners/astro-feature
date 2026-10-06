import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
export default defineConfig({
  output: 'static',
  integrations: [react()],
  site: process.env.ASTRO_SITE || undefined,
  base: process.env.ASTRO_BASE || '/',
});
