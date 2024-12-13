import type { ItemView } from 'obsidian';
import type { ViewType } from '../../implementations/ViewType.ts';

/** @public */
export interface EmptyView extends ItemView {
    /**
     * Get the current view type
     */
    getViewType(): typeof ViewType.Empty;
}
