import type {
    Reference,
    ReferenceCache
} from 'obsidian';

/**
 * Check if the reference is a reference cache.
 *
 * @param reference - The reference to check.
 * @returns Whether the reference is a reference cache.
 * @public
 */
export function isReferenceCache(reference: Reference): reference is ReferenceCache {
    return !!(reference as Partial<ReferenceCache>).position;
}
