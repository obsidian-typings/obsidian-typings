export default new Map([
  [
    'src/content/docs/attribution.mdx',
    () =>
      import(
        'astro:content-layer-deferred-module?astro%3Acontent-layer-deferred-module=&fileName=src%2Fcontent%2Fdocs%2Fattribution.mdx&astroContentModuleFlag=true'
      )
  ],
  [
    'src/content/docs/contributing.mdx',
    () =>
      import(
        'astro:content-layer-deferred-module?astro%3Acontent-layer-deferred-module=&fileName=src%2Fcontent%2Fdocs%2Fcontributing.mdx&astroContentModuleFlag=true'
      )
  ],
  [
    'src/content/docs/disclaimer.mdx',
    () =>
      import(
        'astro:content-layer-deferred-module?astro%3Acontent-layer-deferred-module=&fileName=src%2Fcontent%2Fdocs%2Fdisclaimer.mdx&astroContentModuleFlag=true'
      )
  ],
  [
    'src/content/docs/getting-started.mdx',
    () =>
      import(
        'astro:content-layer-deferred-module?astro%3Acontent-layer-deferred-module=&fileName=src%2Fcontent%2Fdocs%2Fgetting-started.mdx&astroContentModuleFlag=true'
      )
  ],
  [
    'src/content/docs/index.mdx',
    () =>
      import('astro:content-layer-deferred-module?astro%3Acontent-layer-deferred-module=&fileName=src%2Fcontent%2Fdocs%2Findex.mdx&astroContentModuleFlag=true')
  ],
  [
    'src/content/docs/usage.mdx',
    () =>
      import('astro:content-layer-deferred-module?astro%3Acontent-layer-deferred-module=&fileName=src%2Fcontent%2Fdocs%2Fusage.mdx&astroContentModuleFlag=true')
  ],
  [
    'src/content/docs/guides/adding-new-typings.mdx',
    () =>
      import(
        'astro:content-layer-deferred-module?astro%3Acontent-layer-deferred-module=&fileName=src%2Fcontent%2Fdocs%2Fguides%2Fadding-new-typings.mdx&astroContentModuleFlag=true'
      )
  ],
  [
    'src/content/docs/guides/analyzing-source-code.mdx',
    () =>
      import(
        'astro:content-layer-deferred-module?astro%3Acontent-layer-deferred-module=&fileName=src%2Fcontent%2Fdocs%2Fguides%2Fanalyzing-source-code.mdx&astroContentModuleFlag=true'
      )
  ],
  [
    'src/content/docs/guides/code-debugging.mdx',
    () =>
      import(
        'astro:content-layer-deferred-module?astro%3Acontent-layer-deferred-module=&fileName=src%2Fcontent%2Fdocs%2Fguides%2Fcode-debugging.mdx&astroContentModuleFlag=true'
      )
  ],
  [
    'src/content/docs/resources/electron-changelog.mdx',
    () =>
      import(
        'astro:content-layer-deferred-module?astro%3Acontent-layer-deferred-module=&fileName=src%2Fcontent%2Fdocs%2Fresources%2Felectron-changelog.mdx&astroContentModuleFlag=true'
      )
  ],
  [
    'src/content/docs/resources/obsidian-typings-changelog.mdx',
    () =>
      import(
        'astro:content-layer-deferred-module?astro%3Acontent-layer-deferred-module=&fileName=src%2Fcontent%2Fdocs%2Fresources%2Fobsidian-typings-changelog.mdx&astroContentModuleFlag=true'
      )
  ],
  [
    'src/content/docs/resources/showcase.mdx',
    () =>
      import(
        'astro:content-layer-deferred-module?astro%3Acontent-layer-deferred-module=&fileName=src%2Fcontent%2Fdocs%2Fresources%2Fshowcase.mdx&astroContentModuleFlag=true'
      )
  ]
]);
