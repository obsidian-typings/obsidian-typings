import type { View } from 'obsidian';

/**
 * A lazily loaded view placeholder that defers initialization until the view is actually needed.
 * @public
 * @unofficial
 */
export interface DeferredView extends View {
}
