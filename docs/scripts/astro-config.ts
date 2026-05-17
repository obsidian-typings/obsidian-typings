import StarlightIntegration from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import starlightLinksValidatorPlugin from 'starlight-links-validator';
// eslint-disable-next-line import-x/no-rename-default -- Default export name `plugin` is too generic.
import starlightThemeObsidian from 'starlight-theme-obsidian';

import { admonitionRenderer } from './helpers/remark-plugins/custom-admonition-renderer.ts';
import { githubLocationRenderer } from './helpers/remark-plugins/github-location-renderer.ts';
import { remarkRelativeLinks } from './helpers/remark-plugins/remark-relative-links.ts';

const BASE = '/obsidian-typings';

export const astroConfig = defineConfig({
  base: BASE,
  devToolbar: {
    enabled: false
  },
  integrations: [
    StarlightIntegration({
      components: {
        SiteTitle: './src/components/SiteTitle.astro'
      },
      customCss: [
        './src/styles/global.css'
      ],
      editLink: {
        baseUrl: 'https://github.com/obsidian-typings/obsidian-typings/tree/main/docs/'
      },
      favicon: './favicon.png',
      plugins: [
        // Disabled for now — too slow with 5000+ pages
        // starlightLinksValidatorPlugin({
        //   errorOnInvalidHashes: false,
        //   errorOnRelativeLinks: false
        // }),
        // Disabled for now — too slow with 5000+ pages
        // starlightThemeObsidian({...})
      ],
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
          autogenerate: { directory: 'guides' },
          label: 'Guides'
        },
        {
          autogenerate: { directory: 'resources' },
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
  site: 'https://fevol.github.io'
});

function getApiSidebar(): Array<{ collapsed: boolean; items: Array<{ label: string; link: string }>; label: string }> {
  const sidebarPath = resolve(import.meta.dirname, '../src/generated-sidebar.json');
  if (!existsSync(sidebarPath)) {
    console.warn('[astro-config] generated-sidebar.json not found. Run generate-api-docs first.');
    return [];
  }
  return JSON.parse(readFileSync(sidebarPath, 'utf-8'));
}
