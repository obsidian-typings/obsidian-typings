import type { CachedMetadata } from 'obsidian';

import type { CanvasEmbed } from './CanvasEmbed.d.ts';

/**
 * Represents a single entry in the canvas index, containing cached metadata and embeds for a canvas file.
 *
 * @public
 * @unofficial
 */
export interface CanvasIndexEntry {
  /** Cached metadata for each node in the canvas, keyed by node ID. */
  caches: Record<string, CachedMetadata>;

  /** List of embedded file references within the canvas. */
  embeds: CanvasEmbed[];
}
