import type {
    App,
    Menu,
    TAbstractFile,
    WorkspaceLeaf
} from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { GraphPlugin } from './GraphPlugin.d.ts';
import type { GraphPluginInstanceOptions } from './GraphPluginInstanceOptions.d.ts';

/**
 * Instance of the graph internal plugin, managing graph views and options.
 * @public
 * @unofficial
 */
export interface GraphPluginInstance extends InternalPluginInstance<GraphPlugin> {
    /** Reference to the Obsidian app instance. */
    app: App;

    /** Whether the graph plugin is enabled by default. */
    defaultOn: true;

    /** User-configurable options for the graph plugin. */
    options: GraphPluginInstanceOptions;

    /** Reference to the parent graph plugin. */
    plugin: GraphPlugin;

    /** Reload options when settings are changed externally. */
    onExternalSettingsChange(): Promise<void>;

    /** Add graph-related items to the file context menu. */
    onFileMenu(menu: Menu, file: TAbstractFile, source: string, leaf?: WorkspaceLeaf): void;

    /** Open the global graph view. */
    openGraphView(newLeaf: boolean): void;

    /** Open the local graph view for the current file. */
    openLocalGraph(checking: boolean): true | undefined;

    /**
     * Saves the options in graph.json.
     */
    saveOptions(): void;
}
