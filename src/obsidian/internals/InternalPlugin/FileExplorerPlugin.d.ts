import type {
    TFile,
    TFolder
} from 'obsidian';
import type { InternalPlugin } from './InternalPlugin.js';
import type { FileExplorerPluginInstance } from './FileExplorerPluginInstance.js';

/** @todo Documentation incomplete */
/** @public */
export interface FileExplorerPlugin extends InternalPlugin<FileExplorerPluginInstance> {
    /**
     * Reveals a file or folder in the file explorer view, opens the view if it is not already
     * open/visible
     */
    revealInFolder(item: TFile | TFolder): void;
}
