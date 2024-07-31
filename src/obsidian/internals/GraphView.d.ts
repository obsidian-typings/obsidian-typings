import type { ItemView } from "obsidian";
/** @todo Documentation incomplete */
export interface GraphView extends ItemView {
    /**
     * Get the current view type
     * @returns "graph"
     */
    getViewType(): string;
    /** @internal */
    update(): void;
    /** @internal */
    onOptionsChange(): void;
}
