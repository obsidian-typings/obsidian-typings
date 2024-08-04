import type { ItemView } from "obsidian";

/** @public */
export interface EmptyView extends ItemView {
    /**
     * Get the current view type
     */
    getViewType(): "empty";
}
