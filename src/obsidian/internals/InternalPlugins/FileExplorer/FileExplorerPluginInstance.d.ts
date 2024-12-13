import type {
    TFile,
    TFolder
} from 'obsidian';
import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.js';
import type { FileExplorerPlugin } from './FileExplorerPlugin.js';

/** @todo Documentation incomplete */
/** @public */
export interface FileExplorerPluginInstance extends InternalPluginInstance<FileExplorerPlugin> {
    app: App;
    defaultOn: boolean;
    plugin: FileExplorerPlugin;

    /**
     * Reveals a file or folder in the file explorer view, opens the view if it is not already
     * open/visible
     */
    revealInFolder(item: TFile | TFolder): void;
}
