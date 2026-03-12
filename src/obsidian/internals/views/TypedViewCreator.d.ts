import type {
  View,
  WorkspaceLeaf
} from 'obsidian';

/**
 * Factory function type that creates a typed view instance for a given workspace leaf.
 *
 * @typeParam TView - The type of the view.
 * @public
 * @unofficial
 */
export type TypedViewCreator<TView extends View> = (leaf: WorkspaceLeaf) => TView;
