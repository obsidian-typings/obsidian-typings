import type {
    View,
    WorkspaceLeaf
} from 'obsidian';

/**
 * A constructor for a view that is typed to a specific view type.
 *
 * @public
 */
export type TypedViewConstructor<TView extends View> = new(leaf: WorkspaceLeaf) => TView;
