import type { ItemView } from 'obsidian';
import type { ViewType } from '../../../implementations/Constants/ViewType.d.ts';
import type { GraphEngine } from './GraphEngine.d.ts';
import type { GraphRenderer } from './GraphRenderer.d.ts';

/**
 * Obsidian view for a global graph.
 * 
 * @public
 * @unofficial
 */
export interface GraphView extends ItemView {
    /** @todo Documentation incomplete. */
    dataEngine: GraphEngine;

    /** @todo Documentation incomplete. */
    renderer: GraphRenderer;

    /**
     * Get the current view type.
     */
    getViewType(): typeof ViewType.Graph;

    /**
     * Updates the options from the plugin when changed in view.
     */
    onOptionsChange(): void;

    /**
     * Renders the graph.
     */
    update(): void;
}
