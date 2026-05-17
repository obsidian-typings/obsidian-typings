import type { StarlightPlugin } from '@astrojs/starlight/types';

import StarlightIntegration from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import starlightLinksValidatorPlugin from 'starlight-links-validator';
// eslint-disable-next-line import-x/no-rename-default -- Default export name `plugin` is too generic.
import starlightThemeObsidian from 'starlight-theme-obsidian';
import starlightTypeDocPlugin from 'starlight-typedoc';

import { admonitionRenderer } from './helpers/remark-plugins/custom-admonition-renderer.ts';
import { githubLocationRenderer } from './helpers/remark-plugins/github-location-renderer.ts';
import { remarkRelativeLinks } from './helpers/remark-plugins/remark-relative-links.ts';

const FULL_TYPES_PATH = resolve(import.meta.dirname, '../../src/full-types.d.ts');
const HAS_FULL_TYPES = existsSync(FULL_TYPES_PATH);

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
        ...getTypeDocPlugin(),
        starlightLinksValidatorPlugin({
          errorOnInvalidHashes: false,
          // FIXME: TypeDoc generates relative links on its own, which are valid but could be expressed as just absolute links.
          errorOnRelativeLinks: false
        }),
        starlightThemeObsidian({
          graphConfig: {
            actions: ['fullscreen', 'reset-zoom', 'depth'],
            labelFontSize: 8,
            nodeDefaultStyle: {
              neighborScale: 0.3
            },
            renderArrows: true,
            repelForce: 500,
            tagRenderMode: 'same',
            tagStyles: {
              augmentations: { shapeColor: 'nodeColor7', shapeSize: 8 },
              canvas: { shapeColor: 'nodeColor3', shapeSize: 8 },
              // eslint-disable-next-line camelcase -- Intentional naming.
              codemirror__view: { shapeColor: 'nodeColor5', shapeSize: 8 },
              global: { shapeColor: 'nodeColor2', shapeSize: 8 },
              internals: { shapeColor: 'nodeColor8', shapeSize: 8 },
              obsidian: { shapeColor: 'nodeColor9', shapeSize: 8 },
              publish: { shapeColor: 'nodeColor4', shapeSize: 8 }
            }
          },
          sitemapConfig: {
            tagRules: {
              augmentations: ['**/augmentations/**/*'],
              canvas: ['**/canvas/**/*'],
              // eslint-disable-next-line camelcase -- Intentional naming.
              codemirror__view: ['**/codemirror__view/**/*'],
              global: ['**/global/**/*'],
              internals: ['**/internals/**/*'],
              obsidian: ['**/obsidian/**/*'],
              publish: ['**/publish/**/*']
            }
          }
        })
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
        {
          autogenerate: { directory: 'api' },
          label: 'API'
        }
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

function getTypeDocPlugin(): StarlightPlugin[] {
  if (!HAS_FULL_TYPES) {
    console.warn('[astro-config] Skipping TypeDoc plugin: src/full-types.d.ts not found. Run setup on a release branch first.');
    return [];
  }

  return [
    starlightTypeDocPlugin({
      entryPoints: [
        '../src/full-types.d.ts'
      ],
      pagination: true,
      sidebar: {
        collapsed: true,
        label: 'API'
      },
      tsconfig: './tsconfig.json',
      typeDoc: {
        classPropertiesFormat: 'table',
        entryPointStrategy: 'expand',
        enumMembersFormat: 'table',
        excludeExternals: false,
        githubPages: false,
        indexFormat: 'table',
        interfacePropertiesFormat: 'table',
        parametersFormat: 'table',
        plugin: [
          'typedoc-plugin-mdn-links',
          'typedoc-plugin-frontmatter',
          './scripts/helpers/typedoc-plugins/resolve-source-plugin.ts',
          './scripts/helpers/typedoc-plugins/alter-frontmatter-plugin.ts',
          './scripts/helpers/typedoc-plugins/custom-md-render-plugin.ts'
        ],
        // FIXME: Prevent Readme from being generated, as it creates invalid links
        readme: 'none',
        skipErrorChecking: true,
        tableColumnSettings: {
          hideInherited: true,
          hideModifiers: true,
          hideSources: true,
          leftAlignHeaders: true
        },
        theme: 'starlight-typedoc'
      }
    })
  ];
}
