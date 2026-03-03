import type {
    TFile,
    TFolder
} from 'obsidian';
import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { FileExplorerPlugin } from './FileExplorerPlugin.d.ts';

/**
 * Plugin instance for the file explorer, managing the file tree sidebar view.
 * @public
 * @unofficial
 */
export interface FileExplorerPluginInstance extends InternalPluginInstance<FileExplorerPlugin> {
    /** Reference to the app. */
    app: App;

    /** Whether this plugin is enabled by default. */
    defaultOn: true;

    /** Reference to the file explorer plugin registration. */
    plugin: FileExplorerPlugin;

    /**
     * Reveals a file or folder in the file explorer view, opens the view if it is not already.
     * open/visible.
     *
     * @param item - The file or folder to reveal.
     * @unofficial
     */
    revealInFolder(item: TFile | TFolder): void;
}
