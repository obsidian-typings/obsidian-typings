import type { HoverLinkSource } from 'obsidian';

/**
 * Record mapping source identifiers to their hover link source configurations.
 *
 * @public
 * @unofficial
 */
export interface WorkspaceHoverLinkSourcesRecord extends Record<string, HoverLinkSource> {}
