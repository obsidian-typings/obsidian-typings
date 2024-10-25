import type {
    EmbedCache,
    Reference
} from 'obsidian';
import { isReferenceCache } from './isReferenceCache.ts';

export function isEmbedCache(reference: Reference): reference is EmbedCache {
    return isReferenceCache(reference) && reference.original[0] === '!';
}
