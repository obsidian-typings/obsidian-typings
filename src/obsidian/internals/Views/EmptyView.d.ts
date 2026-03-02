import type { ItemView } from 'obsidian';
import type { ViewType } from '../../implementations/Constants/ViewType.d.ts';

/**
 * View displayed when a workspace leaf has no content or file open.
 * @public
 * @unofficial
 */
export interface EmptyView extends ItemView {
    /**
     * Get the current view type.
     */
    getViewType(): typeof ViewType.Empty;
}
