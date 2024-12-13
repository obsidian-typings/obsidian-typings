import type { TFile } from 'obsidian';
import type { InfoFileView } from '../../Views/InfoFileView.js';

/** @todo Documentation incomplete */
/** @public */
export interface BacklinkView extends InfoFileView {
    backlink: {
        recomputeBacklink: (backlinkFile: TFile) => void;
    };

    /**
     * Get the current view type
     */
    getViewType(): 'backlink';
    /**
     * Shows the search
     */
    showSearch(): void;
    /** @todo Documentation incomplete */
    update(): void;
}
