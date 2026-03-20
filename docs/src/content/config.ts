import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
// eslint-disable-next-line import-x/no-unresolved -- Defined as virtual module.
import { defineCollection } from 'astro:content';
import { pageThemeObsidianSchema } from 'starlight-theme-obsidian/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: pageThemeObsidianSchema
    })
  })
};
