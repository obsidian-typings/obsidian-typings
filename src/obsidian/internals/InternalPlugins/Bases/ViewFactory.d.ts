import type { View } from 'obsidian';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export type ViewFactory<TView extends View = View> = (containerEl: HTMLElement) => TView;
