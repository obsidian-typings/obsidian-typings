import type { WorkspaceLeaf } from 'obsidian';
import type { View } from 'obsidian';

/**
 * Factory function type that creates a typed view instance for a given workspace leaf.
 *
 * @public
 * @unofficial
 */
export type TypedViewCreator<TView extends View> = (leaf: WorkspaceLeaf) => TView;
