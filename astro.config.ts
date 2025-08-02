import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // ...envConfig,
  site: process.env.BUILD_TARGET === 'github-pages'
      ? 'https://flystorage.dev'
      : undefined,

  integrations: [
      starlight({
          favicon: 'favicon.svg',
          logo: {
              light: './src/assets/flystorage.svg',
              dark: './src/assets/flystorage-dark.svg',
          },
          title: 'Flystorage',
          components: {
              Pagination: './src/components/Pagination.astro',
          },
          social: [
              {icon: 'github', label: 'GitHub', href: 'https://github.com/duna-oss/flystorage'},
          ],
          sidebar: [
              {
                  label: 'Getting Started',
                  collapsed: false,
                  items: [
                      { label: 'Setup', link: '/setup/' },
                      { label: 'FileStorage API', link: '/api/' },
                      { label: 'Architecture', link: '/architecture/' },
                      { label: 'Visibility', link: '/visibility/' },
                      { label: 'Custom Adapter', link: '/custom-adapter/' },
                  ],
              },
              {
                  label: 'Adapters',
                  collapsed: false,
                  autogenerate: { directory: 'adapter' },
              },
              {
                  label: 'Tools',
                  collapsed: false,
                  autogenerate: { directory: 'tools' },
              },
          ],
          customCss: [
              '@fontsource/lato/400.css',
              '@fontsource/lato/700.css',
              '@fontsource/lato/900.css',
              './src/styles/global.css',
          ],
      }),
      // tailwind({ applyBaseStyles: false }),
	],

  vite: {
    plugins: [tailwindcss()],
  },
});