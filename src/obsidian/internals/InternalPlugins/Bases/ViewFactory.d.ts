import type { View } from 'obsidian';

/**
 * View factory.
 *
 * @public
 * @unofficial
 */
export type ViewFactory<TView extends View = View> = (containerEl: HTMLElement) => TView;
