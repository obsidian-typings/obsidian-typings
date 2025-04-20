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
 * @public
 * @unofficial
 */
export interface GraphPluginInstance extends InternalPluginInstance<GraphPlugin> {
    app: App;
    defaultOn: true;
    /** @internal */
    options: GraphPluginInstanceOptions;
    plugin: GraphPlugin;

    onExternalSettingsChange(): Promise<void>;
    onFileMenu(menu: Menu, file: TAbstractFile, source: string, leaf?: WorkspaceLeaf): void;
    openGraphView(newLeaf: boolean): void;
    openLocalGraph(checking: boolean): true | undefined;
    /**
     * Saves the options in graph.json.
     */
    saveOptions(): void;
}
