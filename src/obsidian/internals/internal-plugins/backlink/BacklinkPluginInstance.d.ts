import type {
    App,
    Menu,
    TAbstractFile,
    TFile,
    WorkspaceLeaf
} from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { BacklinkPlugin } from './BacklinkPlugin.d.ts';
import type { BacklinkPluginInstanceOptions } from './BacklinkPluginInstanceOptions.d.ts';

/**
 * Plugin instance for backlinks, managing backlink view lifecycle and file event handling.
 * @public
 * @unofficial
 */
export interface BacklinkPluginInstance extends InternalPluginInstance<BacklinkPlugin> {
    /** Reference to the app. */
    app: App;

    /** Whether this plugin is enabled by default. */
    defaultOn: true;

    /** The currently tracked file for backlinks. */
    file?: TFile | null;

    /** Configuration options for the backlink plugin. */
    options: BacklinkPluginInstanceOptions;

    /** Reference to the backlink plugin registration. */
    plugin: BacklinkPlugin;

    /** Initialize the backlink view leaf. */
    initLeaf(): void;

    /**
     * Called when the plugin is enabled.
     *
     * @param app - The app instance.
     * @param plugin - The backlink plugin registration.
     * @returns A promise that resolves when the plugin is enabled.
     */
    onEnable(app: App, plugin: BacklinkPlugin): Promise<void>;

    /**
     * Handle external settings file changes and reload configuration.
     *
     * @returns A promise that resolves when the settings are reloaded.
     */
    onExternalSettingsChange(): Promise<void>;

    /**
     * Add backlink-related items to a file context menu.
     *
     * @param menu - The context menu to extend.
     * @param file - The target file or folder.
     * @param source - The source of the context menu event.
     * @param leaf - Optional workspace leaf context.
     */
    onFileMenu(menu: Menu, file: TAbstractFile, source: string, leaf?: WorkspaceLeaf): void;

    /**
     * Handle a file being opened and update backlink tracking.
     *
     * @param file - The opened file.
     */
    onFileOpen(file: TAbstractFile): void;

    /**
     * Called when the user disables the plugin.
     *
     * @param app - The app instance.
     */
    onUserDisable(app: App): void;

    /** Called when the user enables the plugin. */
    onUserEnable(): void;

    /**
     * Open the backlinks pane for the currently active file.
     *
     * @param skipSplit - Whether to skip splitting the pane.
     * @returns Whether the operation succeeded, or `undefined`.
     */
    openBacklinksForActiveFile(skipSplit: boolean): boolean | undefined;

    /**
     * Toggle the inline backlinks display within the document view.
     *
     * @param skip - Whether to skip the toggle action.
     * @returns Whether the operation succeeded, or `undefined`.
     */
    toggleBacklinksInDocument(skip: boolean): boolean | undefined;

    /** Refresh the backlink results for the current file. */
    updateBacklinks(): void;
}
