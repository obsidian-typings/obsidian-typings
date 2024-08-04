import type { ItemView } from "obsidian";

export interface EmptyView extends ItemView {
    /**
     * Get the current view type
     */
    getViewType(): "empty";
}
