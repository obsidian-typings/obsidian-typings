import type { View } from 'obsidian';

/**
 * View factory.
 *
 * @typeParam TView - The type of the view.
 * @public
 * @unofficial
 */
export type ViewFactory<TView extends View = View> = (containerEl: HTMLElement) => TView;
