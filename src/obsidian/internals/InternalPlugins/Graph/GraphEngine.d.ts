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

/** @public @unofficial */
export interface GraphEngine {
    /** @internal */
    app: App;
    /** @internal */
    colorGroupOptions: GraphColorGroupOptions;
    /** @internal */
    controlsEl: HTMLDivElement;
    /** @internal */
    currentFocusFile: string;
    /** @internal */
    displayOptions: GraphDisplayOptions;
    /** @internal */
    fileFilter: GraphFileFilter;
    /** @internal */
    filterOptions: GraphFilterOptions;
    /** @internal */
    forceOptions: GraphForceOptions;
    /** @internal */
    hasFilter: boolean;
    /** @internal */
    hoverPopover: unknown;
    /** @internal */
    lastHoverLink: unknown;
    /** @internal */
    options: GraphPluginInstanceOptions;
    /** @internal */
    progression: number;
    /** @internal */
    progressionSpeed: number;
    /** @internal */
    renderer: GraphRenderer;
    /** @internal */
    searchQueries: GraphColorGroup[];
    /** @internal */
    view: LocalGraphView | GraphView;

    /**
     * Gets the engine options
     * @internal
     */
    getOptions(): GraphPluginInstanceOptions;
    /**
     * Rerenders the graph
     * @internal
     */
    render(): void;
    /**
     * Sets the engine options
     * @param options - New options. Undefined elements will not be considered.
     * @internal
     */
    setOptions(options: GraphPluginInstanceOptions | undefined): void;
    /**
     * Updates the engine after the search filter has changed
     * @internal
     */
    updateSearch(): void;
}
