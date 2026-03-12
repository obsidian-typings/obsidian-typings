import { MetadataCache } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the MetadataCache constructor.
 *
 * @returns The MetadataCache constructor.
 *
 * @public
 * @unofficial
 */
export function getMetadataCacheConstructor(): ExtractConstructor<MetadataCache> {
  return MetadataCache as ExtractConstructor<MetadataCache>;
}
