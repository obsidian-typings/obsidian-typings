import type { WorkspaceLeaf } from 'obsidian';
import type { View } from 'obsidian';

/** @public @unofficial */
export type TypedViewCreator<TView extends View> = (leaf: WorkspaceLeaf) => TView;
