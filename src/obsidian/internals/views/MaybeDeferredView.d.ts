import type { View } from 'obsidian';
import type { DeferredView } from './DeferredView.d.ts';

/**
 * Union type representing a view that may be either fully loaded or a deferred placeholder.
 *
 * @typeParam TView - The type of the view.
 * @public
 * @unofficial
 */
export type MaybeDeferredView<TView extends View> = TView | DeferredView;
