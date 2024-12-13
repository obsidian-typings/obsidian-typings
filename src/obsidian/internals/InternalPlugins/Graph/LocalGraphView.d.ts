import type { TFile } from 'obsidian';
import type { ViewType } from '../../../implementations/Constants/ViewType.js';
import type { InfoFileView } from '../../Views/InfoFileView.js';

/** @todo Documentation incomplete */
/** @public */
export interface LocalGraphView extends InfoFileView {
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
