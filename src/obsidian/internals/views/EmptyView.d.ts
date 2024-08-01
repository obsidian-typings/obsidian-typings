import type { ItemView } from "obsidian";
/** @todo Documentation incomplete */
export interface EmptyView extends ItemView {
    /**
     * Get the current view type
     */
    getViewType(): "empty";
}
