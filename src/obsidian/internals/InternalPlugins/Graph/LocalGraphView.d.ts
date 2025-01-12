import type { TFile } from 'obsidian';
import type { ViewType } from '../../../implementations/Constants/ViewType.js';
import type { InfoFileView } from '../../Views/InfoFileView.js';
import type { GraphEngine } from './GraphEngine.js';
import type { GraphRenderer } from './GraphRenderer.js';

/** @todo Documentation incomplete */
/** @public */
export interface LocalGraphView extends InfoFileView {
    engine: GraphEngine;
    renderer: GraphRenderer;
    
    /**
     * Get the current view type
     */
    getViewType(): typeof ViewType.LocalGraph;
    /**
     * Requests a update if the changed file is the opened file
     * @param file - The changed file
     */
    onFileChanged(file: TFile): void;
    /**
     * Updates the options from the plugin when changed in view
     */
    onOptionsChange(): void;
    /**
     * Renders the graph
     */
    update(): void;
}
