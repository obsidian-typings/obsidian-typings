import starlight from '@astrojs/starlight'
import {defineConfig} from 'astro/config'
import starlightTypeDoc, {typeDocSidebarGroup} from 'starlight-typedoc'
import {admonitionRenderer, githubLocationRenderer} from './remark-plugins'
import starlightThemeObsidian from "starlight-theme-obsidian";
import starlightLinksValidator from 'starlight-links-validator';


export default defineConfig({
    site: 'https://fevol.github.io',
    base: '/obsidian-typings',
    integrations: [
        starlight({
            title: 'Obsidian Typings',
            editLink: {
              baseUrl: 'https://github.com/Fevol/obsidian-typings/tree/main/docs/'
            },
            favicon: './assets/favicon.png',
            social: {
                github: 'https://github.com/fevol/obsidian-typings'
            },
            sidebar: [
                {
                    label: 'Start Here',
                    items: [
                        { label: 'Getting Started', link: '/getting-started/' },
                        { label: 'Usage', link: '/usage/' },
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
                            './typedoc-plugins/alter-frontmatter-plugin.js',
                            './typedoc-plugins/custom-md-render-plugin.js',
                        ],
                        theme: 'starlight-typedoc',
                        githubPages: false,
                        entryPointStrategy: 'expand',
                        excludeExternals: false,
                    },
                }),
                starlightLinksValidator({
                    errorOnInvalidHashes: false,
                    // FIXME: TypeDoc generates relative links on its own, which are valid but could be expressed as just absolute links.
                    errorOnRelativeLinks: false
                }),
                starlightThemeObsidian({
                    graphConfig: {
                        actions: ["fullscreen", "reset-zoom", "depth"],
                        renderArrows: true,
                        repelForce: 500,
                        labelFontSize: 8,
                        nodeDefaultStyle: {
                            neighborScale: 0.3
                        },
                        tagRenderMode: "same",
                        tagStyles: {
                            "obsidian": { shapeSize: 8, shapeColor: "nodeColor9" },
                            "internals": { shapeSize: 8, shapeColor: "nodeColor8" },
                            "augmentations": { shapeSize: 8, shapeColor: "nodeColor7" },
                            "canvas": { shapeSize: 8, shapeColor: "nodeColor3" },
                            "publish": { shapeSize: 8, shapeColor: "nodeColor4" },
                            "codemirror__view": { shapeSize: 8, shapeColor: "nodeColor5" },
                            "global": { shapeSize: 8, shapeColor: "nodeColor2" },
                        }
                    },
                    sitemapConfig: {
                        tagRules: {
                            "obsidian": [ "**/obsidian/**/*" ],
                            "internals": [ "**/internals/**/*" ],
                            "augmentations": [ "**/augmentations/**/*" ],
                            "canvas": [ "**/canvas/**/*" ],
                            "publish": [ "**/publish/**/*" ],
                            "codemirror__view": [ "**/codemirror__view/**/*" ],
                            "global": [ "**/global/**/*" ],

                        }
                    }
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

