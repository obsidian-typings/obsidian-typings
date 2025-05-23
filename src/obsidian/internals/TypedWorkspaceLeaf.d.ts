import type {
    View,
    WorkspaceLeaf
} from 'obsidian';
import type { MaybeDeferredView } from './Views/MaybeDeferredView.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface TypedWorkspaceLeaf<TView extends View> extends WorkspaceLeaf {
    /** @todo Documentation incomplete. */
    view: MaybeDeferredView<TView>;
}
