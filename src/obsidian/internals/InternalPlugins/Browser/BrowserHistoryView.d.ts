import type { ItemView } from 'obsidian';
import type { ViewType } from '../../../implementations/Constants/ViewType.d.ts';

/** @todo Documentation incomplete */
/**
 * @public
 * @unofficial
 */
export interface BrowserHistoryView extends ItemView {
    /**
     * Get the current view type.
     */
    getViewType(): typeof ViewType.BrowserHistory;
    /** @todo Documentation incomplete */
    update(): Promise<unknown>;
}
