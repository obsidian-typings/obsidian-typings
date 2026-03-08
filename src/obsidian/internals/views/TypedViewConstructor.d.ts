import type {
    View,
    WorkspaceLeaf
} from 'obsidian';
import type { ConstructorBase } from '../constructors/ConstructorBase.d.ts';

/**
 * A constructor for a view that is typed to a specific view type.
 *
 * @typeParam TView - The type of the view.
 * @typeParam Args - The constructor argument types.
 * @public
 * @unofficial
 */
export interface TypedViewConstructor<TView extends View, Args extends unknown[] = []>
    extends ConstructorBase<[leaf: WorkspaceLeaf, ...args: Args], TView>
{}
