import type {
    TFile,
    TFolder
} from 'obsidian';
import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { FileExplorerPlugin } from './FileExplorerPlugin.d.ts';

/** @todo Documentation incomplete */
/** @public @unofficial */
export interface FileExplorerPluginInstance extends InternalPluginInstance<FileExplorerPlugin> {
    app: App;
    defaultOn: true;
    plugin: FileExplorerPlugin;

    /**
     * Reveals a file or folder in the file explorer view, opens the view if it is not already
     * open/visible
     */
    revealInFolder(item: TFile | TFolder): void;
}
