import type {
    View,
    WorkspaceLeaf
} from 'obsidian';
import type { MaybeDeferredView } from './views/MaybeDeferredView.d.ts';

/**
 * A workspace leaf with a strongly typed view.
 *
 * @typeParam TView - The type of the view.
 * @public
 * @unofficial
 */
export interface TypedWorkspaceLeaf<TView extends View> extends WorkspaceLeaf {
    /** The typed view attached to this leaf. */
    view: MaybeDeferredView<TView>;
}
