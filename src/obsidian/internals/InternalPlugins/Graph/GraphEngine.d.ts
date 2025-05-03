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
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface GraphEngine {
    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    colorGroupOptions: GraphColorGroupOptions;

    /** @todo Documentation incomplete. */
    controlsEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    currentFocusFile: string;

    /** @todo Documentation incomplete. */
    displayOptions: GraphDisplayOptions;

    /** @todo Documentation incomplete. */
    fileFilter: GraphFileFilter;

    /** @todo Documentation incomplete. */
    filterOptions: GraphFilterOptions;

    /** @todo Documentation incomplete. */
    forceOptions: GraphForceOptions;

    /** @todo Documentation incomplete. */
    hasFilter: boolean;

    /** @todo Documentation incomplete. */
    hoverPopover: unknown;

    /** @todo Documentation incomplete. */
    lastHoverLink: unknown;

    /** @todo Documentation incomplete. */
    options: GraphPluginInstanceOptions;

    /** @todo Documentation incomplete. */
    progression: number;

    /** @todo Documentation incomplete. */
    progressionSpeed: number;

    /** @todo Documentation incomplete. */
    renderer: GraphRenderer;

    /** @todo Documentation incomplete. */
    searchQueries: GraphColorGroup[];

    /** @todo Documentation incomplete. */
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
