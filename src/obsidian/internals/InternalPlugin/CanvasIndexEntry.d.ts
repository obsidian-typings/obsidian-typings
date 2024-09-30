import type { CachedMetadata } from 'obsidian';
import type { CanvasEmbed } from './CanvasEmbed.js';

/** @public */
export interface CanvasIndexEntry {
    caches: Record<string, CachedMetadata>;
    embeds: CanvasEmbed[];
}
