import type {
    TFile,
    TFolder
} from 'obsidian';
import type { App } from 'obsidian';
import type { FileExplorerPlugin } from './FileExplorerPlugin.js';
import type { InternalPluginInstance } from './InternalPluginInstance.js';

/** @todo Documentation incomplete */
/** @public */
export interface FileExplorerPluginInstance extends InternalPluginInstance {
    defaultOn: boolean;
    app: App;
    plugin: FileExplorerPlugin;

    /**
     * Reveals a file or folder in the file explorer view, opens the view if it is not already
     * open/visible
     */
    revealInFolder(item: TFile | TFolder): void;
}
