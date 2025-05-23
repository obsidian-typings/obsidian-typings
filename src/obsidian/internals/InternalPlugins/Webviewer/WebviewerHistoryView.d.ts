import type { ItemView } from 'obsidian';
import type { ViewType } from '../../../implementations/Constants/ViewType.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface WebviewerHistoryView extends ItemView {
    /**
     * Get the current view type.
     */
    getViewType(): typeof ViewType.WebviewerHistory;

    /** @todo Documentation incomplete */
    update(): Promise<unknown>;
}
