import type { WorkspaceLeaf } from 'obsidian';
import type { View } from 'obsidian';

/**
 * @todo Documentation incomplete.
 *
 * @public
 * @unofficial
 */
export type TypedViewCreator<TView extends View> = (leaf: WorkspaceLeaf) => TView;
