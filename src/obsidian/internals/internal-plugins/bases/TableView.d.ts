import type { View } from 'obsidian';
import type { ViewType } from '../../../implementations/constants/ViewType.ts';

/**
 * Table view.
 *
 * @public
 * @unofficial
 */
export interface TableView extends View {
    /**
     * Get view type.
     *
     * @returns The table view type.
     */
    getViewType(): typeof ViewType.Table;
}
