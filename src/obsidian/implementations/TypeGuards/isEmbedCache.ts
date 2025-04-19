import type {
    EmbedCache,
    Reference
} from 'obsidian';
import { isReferenceCache } from './isReferenceCache.ts';

/**
 * Check if the reference is an embed cache.
 *
 * @param reference - The reference to check.
 * @returns Whether the reference is an embed cache.
 * @public @unofficial
 */
export function isEmbedCache(reference: Reference): reference is EmbedCache {
    return isReferenceCache(reference) && reference.original[0] === '!';
}
