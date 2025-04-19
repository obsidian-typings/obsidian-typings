import type {
    View,
    WorkspaceLeaf
} from 'obsidian';
import type { ConstructorBase } from '../Constructors/ConstructorBase.d.ts';

/**
 * A constructor for a view that is typed to a specific view type.
 *
 * @public @unofficial
 */
export interface TypedViewConstructor<TView extends View, Args extends unknown[] = []>
    extends ConstructorBase<[leaf: WorkspaceLeaf, ...args: Args], TView>
{}
