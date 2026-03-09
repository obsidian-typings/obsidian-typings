import type {
  CacheItem,
  Reference
} from 'obsidian';

/**
 * A reference with position information in the source file.
 * @public
 * @unofficial
 */
export interface PositionedReference extends Reference, CacheItem {
}
