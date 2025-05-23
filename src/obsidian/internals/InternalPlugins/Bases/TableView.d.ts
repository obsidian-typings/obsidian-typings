import type { View } from 'obsidian';
import type { ViewType } from '../../../implementations/Constants/ViewType.ts';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface TableView extends View {
    /** @todo Documentation incomplete */
    getViewType(): typeof ViewType.Table;
}
