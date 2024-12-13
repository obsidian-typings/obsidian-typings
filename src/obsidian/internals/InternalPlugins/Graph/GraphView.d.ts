import type { ItemView } from 'obsidian';

/** @todo Documentation incomplete */
/** @public */
export interface GraphView extends ItemView {
    dataEngine: unknown;

    /**
     * Get the current view type
     */
    getViewType(): 'graph';
    /**
     * Updates the options from the plugin when changed in view
     */
    onOptionsChange(): void;
    /**
     * Renders the graph
     */
    update(): void;
}
