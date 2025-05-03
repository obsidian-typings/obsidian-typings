import type { View } from 'obsidian';
import type { DeferredView } from './DeferredView.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export type MaybeDeferredView<TView extends View> = TView | DeferredView;
