import starlight from '@astrojs/starlight'
import {defineConfig} from 'astro/config'
import starlightTypeDoc, {typeDocSidebarGroup} from 'starlight-typedoc'
import {admonitionRenderer, githubLocationRenderer} from './remark-plugins'
import starlightThemeObsidian from "starlight-theme-obsidian";


export default defineConfig({
    site: 'https://fevol.github.io',
    base: '/obsidian-typings',
    integrations: [
        starlight({
            title: 'Obsidian Typings',
            favicon: './assets/favicon.png',
            social: {
                github: 'https://github.com/fevol/obsidian-typings'
            },
            sidebar: [
                {
                    label: 'Start Here',
                    items: [
                        { label: 'Getting Started', link: '/getting-started/' },
                        { label: 'Disclaimer', link: '/disclaimer/' },
                        { label: 'Contributing', link: '/contributing/' },
                        { label: 'Attribution', link: '/attribution/' },
                    ],
                },
                {
                    label: 'Guides',
                    autogenerate: {directory: 'guides'},
                },
                {
                    label: 'Resources',
                    autogenerate: {directory: 'resources'},
                },
                // typeDocSidebarGroup
                {
                    label: 'API',
                    autogenerate: {directory: 'api'}
                }
            ],
            customCss: [
                './src/styles/global.css'
            ],
            plugins: [
                // Generate the documentation.
                starlightTypeDoc({
                    entryPoints: [
                        '../src/full-types.d.ts'
                    ],
                    tsconfig: './tsconfig.json',
                    pagination: true,
                    sidebar: {
                        label: 'API',
                        collapsed: true
                    },
                    typeDoc: {
                        plugin: [
                            'typedoc-plugin-mdn-links',
                            'typedoc-plugin-frontmatter',
                            './typedoc-plugins/resolve-source-plugin.js',
                            './typedoc-plugins/badge-addition-plugin.js',
                            // './typedoc-plugins/custom-md-render-plugin.js',
                        ],
                        theme: 'starlight-typedoc',
                        githubPages: false,
                        entryPointStrategy: 'expand',
                        excludeExternals: false,
                    },
                }),
                starlightThemeObsidian({

                })
            ]
        }),
    ],
    markdown: {
        remarkPlugins: [
            admonitionRenderer,
            githubLocationRenderer
        ]
    },
    devToolbar: {
        enabled: false
    }
})

