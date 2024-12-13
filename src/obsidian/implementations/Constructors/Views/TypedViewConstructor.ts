import type {
    View,
    WorkspaceLeaf
} from 'obsidian';

export type TypedViewConstructor<TView extends View> = new(leaf: WorkspaceLeaf) => TView;
