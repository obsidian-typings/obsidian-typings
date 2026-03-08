import type {
    LinkCache,
    Reference
} from 'obsidian';
import { isReferenceCache } from './isReferenceCache.ts';

/**
 * Check if the reference is a link cache.
 *
 * @param reference - The reference to check.
 * @returns Whether the reference is a link cache.
 *
 * @public
 * @unofficial
 */
export function isLinkCache(reference: Reference): reference is LinkCache {
    return isReferenceCache(reference) && reference.original[0] !== '!';
}
