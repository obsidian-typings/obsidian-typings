import type { TFile } from 'obsidian';
import type { ViewType } from '../../../implementations/Constants/ViewType.d.ts';
import type { InfoFileView } from '../../Views/InfoFileView.d.ts';
import type { GraphEngine } from './GraphEngine.d.ts';
import type { GraphRenderer } from './GraphRenderer.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface LocalGraphView extends InfoFileView {
    /** @todo Documentation incomplete. */
    engine: GraphEngine;

    /** @todo Documentation incomplete. */
    renderer: GraphRenderer;

    /**
     * Get the current view type.
     */
    getViewType(): typeof ViewType.LocalGraph;

    /**
     * Requests a update if the changed file is the opened file.
     *
     * @param file - The changed file.
     */
    onFileChanged(file: TFile): void;

    /**
     * Updates the options from the plugin when changed in view.
     */
    onOptionsChange(): void;

    /**
     * Renders the graph.
     */
    update(): void;
}
