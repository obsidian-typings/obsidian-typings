import type {
    FrontmatterLinkCache,
    Reference
} from 'obsidian';

export function isFrontmatterLinkCache(reference: Reference): reference is FrontmatterLinkCache {
    return !!(reference as Partial<FrontmatterLinkCache>).key;
}
