import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  site: 'https://jcpopdigitalpartners.github.io',
  base: '/astro-feature',
});