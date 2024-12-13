import type { View } from 'obsidian';
import type { DeferredView } from './DeferredView.js';

/** @public */
export type MaybeDeferredView<TView extends View> = TView | DeferredView;
