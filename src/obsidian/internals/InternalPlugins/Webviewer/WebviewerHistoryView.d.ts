import type { ItemView } from 'obsidian';
import type { ViewType } from '../../../implementations/Constants/ViewType.ts';

/**
 * View that displays the web browser browsing history.
 * @public
 * @unofficial
 */
export interface WebviewerHistoryView extends ItemView {
    /**
     * Get the current view type.
     */
    getViewType(): typeof ViewType.WebviewerHistory;

    /** Refresh the browsing history list. */
    update(): Promise<unknown>;
}
