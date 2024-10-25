import type {
    Reference,
    ReferenceCache
} from 'obsidian';

export function isReferenceCache(reference: Reference): reference is ReferenceCache {
    return !!(reference as Partial<ReferenceCache>).position;
}
