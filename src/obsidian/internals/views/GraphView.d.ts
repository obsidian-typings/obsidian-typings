import type { ItemView } from "obsidian";
/** @todo Documentation incomplete */
export interface GraphView extends ItemView {
    /**
     * Get the current view type
     */
    getViewType(): "graph";
    /** @internal */
    update(): void;
    /** @internal */
    onOptionsChange(): void;
}
