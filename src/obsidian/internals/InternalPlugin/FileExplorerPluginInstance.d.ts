import type {
    TFile,
    TFolder
} from 'obsidian';
import type { InternalPluginInstance } from './InternalPluginInstance.js';

/** @todo Documentation incomplete */
/** @public */
export interface FileExplorerPluginInstance extends InternalPluginInstance {
    /**
     * Reveals a file or folder in the file explorer view, opens the view if it is not already
     * open/visible
     */
    revealInFolder(item: TFile | TFolder): void;
}
