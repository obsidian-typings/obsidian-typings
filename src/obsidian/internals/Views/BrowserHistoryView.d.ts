import type { ItemView } from "obsidian";

/** @todo Documentation incomplete */
/** @public */
export interface BrowserHistoryView extends ItemView {
    /**
     * Get the current view type
     */
    getViewType(): "browser-history";
    /** @todo Documentation incomplete */
    update(): Promise<unknown>;
}
