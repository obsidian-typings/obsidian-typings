import type {
    LinkCache,
    Reference
} from 'obsidian';
import { isReferenceCache } from './isReferenceCache.ts';

export function isLinkCache(reference: Reference): reference is LinkCache {
    return isReferenceCache(reference) && reference.original[0] !== '!';
}
