import { docsSchema } from '@astrojs/starlight/schema';
import { defineCollection } from 'astro:content';
import { pageThemeObsidianSchema } from 'starlight-theme-obsidian/schema';

export const collections = {
    docs: defineCollection({
        schema: docsSchema({
            extend: pageThemeObsidianSchema
        })
    })
};
