import type { ItemView } from "obsidian";
/** @todo Documentation incomplete */
export interface BrowserHistoryView extends ItemView {
    /**
     * Get the current view type
     * @returns "browser-history"
     */
    getViewType(): string;
    /** @internal */
    update(): unknown;
}
