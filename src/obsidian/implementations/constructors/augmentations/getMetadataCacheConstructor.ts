import {
  MetadataCache
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type MetadataCacheConstructor = ExtractConstructor<MetadataCache>;

/**
 * Get the MetadataCache constructor.
 *
 * @returns The MetadataCache constructor.
 *
 * @public
 * @unofficial
 */
export function getMetadataCacheConstructor(): MetadataCacheConstructor {
  return MetadataCache as MetadataCacheConstructor;
}
