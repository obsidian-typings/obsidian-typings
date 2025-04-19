import type { View } from 'obsidian';
import type { DeferredView } from './DeferredView.d.ts';

/** @public @unofficial */
export type MaybeDeferredView<TView extends View> = TView | DeferredView;
