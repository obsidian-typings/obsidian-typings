import type { ItemView } from 'obsidian';
import type { ViewType } from '../../../implementations/Constants/ViewType.js';
import type { GraphEngine } from './GraphEngine.js';
import type { GraphRenderer } from './GraphRenderer.js';

/** @todo Documentation incomplete */
/** @public */
export interface GraphView extends ItemView {
    dataEngine: GraphEngine;
    renderer: GraphRenderer;

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
