/**
 * Declarations for the five `virtual:starlight/*` modules the three Starlight component overrides in
 * `src/components/` import. Starlight's Vite plugin generates these modules at build time
 * (`dist/integrations/vite-virtual-modules.js`) and nothing types them: 0.42 restructured the package into
 * `dist/` and dropped the two hand-written declaration files, `virtual.d.ts` and `virtual-internal.d.ts`,
 * that `files: ["dist"]` no longer carries. They are how Starlight's own components read user config, so
 * there is no public replacement to rework the overrides onto -- upstream's 0.42 `Search.astro`,
 * `Sidebar.astro` and `SiteTitle.astro` import exactly these five specifiers too.
 *
 * Every shape below is REFERENCED from a public entry point rather than copied, which is what keeps this
 * from being the hand-copy `AGENTS.md` argues against: `StarlightConfig` comes from
 * `@astrojs/starlight/types`, the component type from the `./components/*` subpath, and the rest from
 * `astro`'s own `AstroConfig` / `ImageMetadata`. A rename or removal in any of them fails `npm run
 * typecheck` here rather than going stale in silence. What a type reference CANNOT see is a virtual module
 * being renamed or dropped, so `npm run check:starlight-virtual-modules` asserts the specifiers against
 * Starlight's installed plugin source; it runs in `verify.yml` beside the other gates.
 *
 * Delete this file if Starlight ships the declarations again -- see `pinned-versions.json`'s entry and
 * https://github.com/withastro/starlight/pull/3572, where shipping Starlight as JavaScript was expected to
 * "entirely eliminate ... the need for private and public declaration files for virtual modules".
 */

declare module 'virtual:starlight/user-config' {
  const config: import('@astrojs/starlight/types').StarlightConfig;
  export default config;
}

declare module 'virtual:starlight/project-context' {
  interface ProjectContext {
    build: ProjectContextBuild;
    root: string;
    /*
     * Spelled as the module spells it. The plugin serializes Astro's own config object, so the four members below
     * are the JSON it emits and renaming one here would declare a property that is not there.
     */
    // eslint-disable-next-line unicorn/name-replacements -- See above: the key is upstream's, not this repo's.
    srcDir: string;
    trailingSlash: import('astro').AstroConfig['trailingSlash'];
  }

  interface ProjectContextBuild {
    format: import('astro').AstroConfig['build']['format'];
  }

  const projectContext: ProjectContext;
  export default projectContext;
}

declare module 'virtual:starlight/user-images' {
  interface UserImages {
    dark?: import('astro').ImageMetadata;
    light?: import('astro').ImageMetadata;
  }

  export const logos: UserImages;
}

declare module 'virtual:starlight/pagefind-config' {
  export const pagefindUserConfig: Partial<Extract<import('@astrojs/starlight/types').StarlightConfig['pagefind'], object>>;
}

declare module 'virtual:starlight/components/MobileMenuFooter' {
  const MobileMenuFooter: typeof import('@astrojs/starlight/components/MobileMenuFooter.astro').default;
  export default MobileMenuFooter;
}
