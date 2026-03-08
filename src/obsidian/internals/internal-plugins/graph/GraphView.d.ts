import type { ItemView } from 'obsidian';
import type { ViewType } from '../../../implementations/constants/ViewType.d.ts';
import type { GraphEngine } from './GraphEngine.d.ts';
import type { GraphRenderer } from './GraphRenderer.d.ts';

/**
 * Obsidian view for a global graph.
 *
 * @public
 * @unofficial
 */
export interface GraphView extends ItemView {
    /** Graph engine powering the global graph simulation. */
    dataEngine: GraphEngine;

    /**
     * Get the current view type.
     *
     * @returns The graph view type.
     */
    getViewType(): typeof ViewType.Graph;

    /**
     * Updates the options from the plugin when changed in view.
     */
    onOptionsChange(): void;

    /** Renderer responsible for drawing the global graph. */
    renderer: GraphRenderer;

    /**
     * Renders the graph.
     */
    update(): void;
}
