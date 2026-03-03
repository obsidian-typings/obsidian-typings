import type {
    FileView,
    TextFileView,
    TFile
} from 'obsidian';
import type { ViewType } from '../../../implementations/Constants/ViewType.ts';
import type { BasesController } from './BasesController.d.ts';
import type { BasesPluginInstance } from './BasesPluginInstance.d.ts';
import type { BasesQuery } from './BasesQuery.d.ts';

/**
 * View for the `Bases` plugin.
 *
 * @public
 * @unofficial
 */
export interface BasesView extends TextFileView {
    /**
     * The controller for the view.
     */
    controller: BasesController;

    /**
     * The last data of the view.
     */
    lastData: string;

    /**
     * Bases plugin.
     */
    plugin: BasesPluginInstance;

    /**
     * The query for the view.
     */
    query: BasesQuery;

    /**
     * Get view type.
     *
     * @returns The bases view type.
     */
    getViewType(): typeof ViewType.Bases;

    /**
     * Called when the layout of the view changes.
     */
    onLayoutChange(): void;

    /**
     * Called when the view changes.
     */
    onViewChanged(): void;

    /**
     * Receives the sync state.
     *
     * @param fileView - The file view to receive the sync state from.
     */
    receiveSyncState(fileView: FileView): void;

    /**
     * Saves the query.
     *
     * @param query - The query to save.
     */
    saveQuery(query: BasesQuery): void;

    /**
     * Updates the current file.
     *
     * @param file - The file to update.
     */
    updateCurrentFile(file: TFile | null): void;
}
