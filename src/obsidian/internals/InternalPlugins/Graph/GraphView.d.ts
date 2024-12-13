import type { ItemView } from 'obsidian';
import type { ViewType } from '../../../implementations/Constants/ViewType.js';

/** @todo Documentation incomplete */
/** @public */
export interface GraphView extends ItemView {
    dataEngine: unknown;

    /**
     * Get the current view type
     */
    getViewType(): typeof ViewType.Graph;
    /**
     * Updates the options from the plugin when changed in view
     */
    onOptionsChange(): void;
    /**
     * Renders the graph
     */
    update(): void;
}
