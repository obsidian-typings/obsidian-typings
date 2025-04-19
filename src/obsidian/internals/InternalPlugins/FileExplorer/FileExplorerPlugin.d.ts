import type {
    TFile,
    TFolder
} from 'obsidian';
import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { FileExplorerPluginInstance } from './FileExplorerPluginInstance.d.ts';

/** @todo Documentation incomplete */
/** @public @unofficial */
export interface FileExplorerPlugin extends InternalPlugin<FileExplorerPluginInstance> {
    /**
     * Reveals a file or folder in the file explorer view, opens the view if it is not already.
     * open/visible.
     */
    revealInFolder(item: TFile | TFolder): void;
}
