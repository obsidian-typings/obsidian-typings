import type { View } from 'obsidian';
import type { ViewType } from '../../../implementations/Constants/ViewType.ts';

/**
 * Table view.
 *
 * @public
 * @unofficial
 */
export interface TableView extends View {
    /**
     * Get view type.
     */
    getViewType(): typeof ViewType.Table;
}
