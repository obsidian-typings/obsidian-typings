import type {
    ReferenceCache,
    TFile
} from 'obsidian';
import type { LinkChangeUpdate } from './LinkChangeUpdate.d.ts';

/**
 * Handler for updating links within a specific file type when files are renamed or moved.
 * @public
 * @unofficial
 */
export interface LinkUpdater {
    /**
     * Apply a batch of link change updates to the given file.
     *
     * @param file - File to update.
     * @param updates - Link change updates to apply.
     */
    applyUpdates(file: TFile, updates: LinkChangeUpdate[]): Promise<void>;

    /**
     * Iterate over all references managed by this updater.
     *
     * @param callback - Callback invoked for each reference.
     */
    iterateReferences(callback: (path: string, reference: ReferenceCache) => void): void;

    /**
     * Rename a subpath reference (e.g. heading or block) within a file.
     *
     * @param file - File containing the subpath.
     * @param oldSubpath - Previous subpath.
     * @param newSubpath - New subpath.
     */
    renameSubpath(file: TFile, oldSubpath: string, newSubpath: string): Promise<void>;
}
