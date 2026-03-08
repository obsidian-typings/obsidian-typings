import type { ItemView } from 'obsidian';
import type { ViewType } from '../../../implementations/constants/ViewType.d.ts';

/**
 * View that displays the web browser browsing history.
 * @public
 * @unofficial
 */
export interface WebviewerHistoryView extends ItemView {
    /**
     * Get the current view type.
     *
     * @returns The webviewer history view type.
     */
    getViewType(): typeof ViewType.WebviewerHistory;

    /**
     * Refresh the browsing history list.
     *
     * @returns The result of refreshing the history.
     */
    update(): Promise<unknown>;
}
