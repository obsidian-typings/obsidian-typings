import type { App } from 'obsidian';
import type { GraphColorGroup } from './GraphColorGroup.d.ts';
import type { GraphFileFilter } from './GraphFileFilter.d.ts';
import type { GraphPluginInstanceOptions } from './GraphPluginInstanceOptions.d.ts';
import type { GraphRenderer } from './GraphRenderer.d.ts';
import type { GraphView } from './GraphView.d.ts';
import type { LocalGraphView } from './LocalGraphView.d.ts';
import type { GraphColorGroupOptions } from './Options/GraphColorGroupOptions.d.ts';
import type { GraphDisplayOptions } from './Options/GraphDisplayOptions.d.ts';
import type { GraphFilterOptions } from './Options/GraphFilterOptions.d.ts';
import type { GraphForceOptions } from './Options/GraphForceOptions.d.ts';

/**
 * Engine of a graph view.
 *
 * @public
 * @unofficial
 */
export interface GraphEngine {
    /** Reference to the Obsidian app instance. */
    app: App;

    /** UI controls for configuring color group options. */
    colorGroupOptions: GraphColorGroupOptions;

    /** Container element for the graph settings controls panel. */
    controlsEl: HTMLDivElement;

    /** Path of the currently focused file in the local graph. */
    currentFocusFile: string;

    /** UI controls for configuring display options. */
    displayOptions: GraphDisplayOptions;

    /** Filter determining which files are included in the graph. */
    fileFilter: GraphFileFilter;

    /** UI controls for configuring filter options. */
    filterOptions: GraphFilterOptions;

    /** UI controls for configuring force simulation options. */
    forceOptions: GraphForceOptions;

    /** Whether any search filter is currently active. */
    hasFilter: boolean;

    /** Hover popover displayed when hovering over a node. */
    hoverPopover: unknown;

    /** Last link that was hovered over. */
    lastHoverLink: unknown;

    /** Current graph plugin options applied to this engine. */
    options: GraphPluginInstanceOptions;

    /** Current animation progression value for graph transitions. */
    progression: number;

    /** Speed of the animation progression. */
    progressionSpeed: number;

    /** Renderer responsible for drawing the graph. */
    renderer: GraphRenderer;

    /** Active color group search queries for node coloring. */
    searchQueries: GraphColorGroup[];

    /** The view (local or global) that owns this engine. */
    view: LocalGraphView | GraphView;

    /**
     * Gets the engine options.
     */
    getOptions(): GraphPluginInstanceOptions;

    /**
     * Rerenders the graph.
     */
    render(): void;

    /**
     * Sets the engine options.
     *
     * @param options - New options. Undefined elements will not be considered.
     */
    setOptions(options: GraphPluginInstanceOptions | undefined): void;

    /**
     * Updates the engine after the search filter has changed.
     */
    updateSearch(): void;
}
