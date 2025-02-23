import type { EmbeddableConstructor } from '../EmbeddableConstructor.d.ts';

/** @public */
export interface EmbedRegistryEmbedByExtensionRecord extends Record<"md", EmbeddableConstructor>, Record<string, EmbeddableConstructor> {}
