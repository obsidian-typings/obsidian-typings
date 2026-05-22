import StarlightIntegration from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import {
  existsSync,
  readFileSync
} from 'node:fs';
import { resolve } from 'node:path';

import { admonitionRenderer } from './helpers/remark-plugins/custom-admonition-renderer.ts';
import { githubLocationRenderer } from './helpers/remark-plugins/github-location-renderer.ts';
import { remarkRelativeLinks } from './helpers/remark-plugins/remark-relative-links.ts';

interface SidebarGroup {
  collapsed: boolean;
  items: (SidebarGroup | SidebarLink)[];
  label: string;
}

interface SidebarLink {
  label: string;
  link: string;
}

const BASE = process.env['BASE_PATH'] ?? '/obsidian-typings';

export const astroConfig = defineConfig({
  base: BASE,
  devToolbar: {
    enabled: false
  },
  integrations: [
    StarlightIntegration({
      components: {
        Search: './src/components/Search.astro',
        SiteTitle: './src/components/SiteTitle.astro'
      },
      customCss: [
        './src/styles/global.css'
      ],
      editLink: {
        baseUrl: 'https://github.com/obsidian-typings/obsidian-typings/tree/main/docs/'
      },
      favicon: './favicon.png',
      plugins: [],
      routeMiddleware: './src/route-data.ts',
      sidebar: [
        {
          items: [
            { label: 'Getting Started', link: '/getting-started/' },
            { label: 'Usage', link: '/usage/' },
            { label: 'Disclaimer', link: '/disclaimer/' },
            { label: 'Contributing', link: '/contributing/' },
            { label: 'Attribution', link: '/attribution/' }
          ],
          label: 'Start Here'
        },
        {
          items: [{ autogenerate: { directory: 'guides' } }],
          label: 'Guides'
        },
        {
          items: [{ autogenerate: { directory: 'resources' } }],
          label: 'Resources'
        },
        ...getApiSidebar()
      ],
      social: [
        { href: 'https://github.com/obsidian-typings/obsidian-typings', icon: 'github', label: 'Github' }
      ],
      title: 'Obsidian Typings'
    })
  ],
  markdown: {
    remarkPlugins: [
      remarkRelativeLinks(BASE),
      admonitionRenderer,
      githubLocationRenderer
    ]
  },
  site: 'https://obsidian-typings.github.io',
  trailingSlash: 'always'
});

function getApiSidebar(): SidebarGroup[] {
  const sidebarPath = resolve(import.meta.dirname, '../src/generated-sidebar.json');
  if (!existsSync(sidebarPath)) {
    console.warn('[astro-config] generated-sidebar.json not found. Run generate-api-docs first.');
    return [];
  }
  return JSON.parse(readFileSync(sidebarPath, 'utf-8')) as SidebarGroup[];
}
