import {
    MetadataCache
} from 'obsidian';
import type { MetadataCacheConstructor } from '../../../internals/Constructors/augmentations/MetadataCacheConstructor.ts';

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
