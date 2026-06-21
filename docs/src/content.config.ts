import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
// eslint-disable-next-line import-x/no-unresolved -- Defined as virtual module.
import { defineCollection } from 'astro:content';

interface GenerateIdParams {
  entry: string;
}

/**
 * Custom ID generator that preserves the original case of file/directory names
 * instead of lowercasing them (Astro's default uses github-slugger which lowercases).
 */
function generateId({ entry }: GenerateIdParams): string {
  const id = entry
    .replace(/\.\w+$/, '')
    .replaceAll('\\', '/')
    .replace(/\/index$/, '');
  return id || 'index';
}

export const collections = {
  docs: defineCollection({
    loader: docsLoader({ generateId }),
    schema: docsSchema()
  })
};
