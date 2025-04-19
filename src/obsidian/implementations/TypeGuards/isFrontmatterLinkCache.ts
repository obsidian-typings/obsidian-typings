import type {
    FrontmatterLinkCache,
    Reference
} from 'obsidian';

/**
 * Check if the reference is a frontmatter link cache.
 *
 * @param reference - The reference to check.
 * @returns Whether the reference is a frontmatter link cache.
 * @public @unofficial
 */
export function isFrontmatterLinkCache(reference: Reference): reference is FrontmatterLinkCache {
    return !!(reference as Partial<FrontmatterLinkCache>).key;
}
