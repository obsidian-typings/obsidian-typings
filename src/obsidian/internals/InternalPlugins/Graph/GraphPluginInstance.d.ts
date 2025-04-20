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
    /**
     * @todo Documentation incomplete.
     */
    app: App;

    /**
     * @todo Documentation incomplete.
     */
    defaultOn: true;

    /**
     * @todo Documentation incomplete.
     */
    options: GraphPluginInstanceOptions;

    /**
     * @todo Documentation incomplete.
     */
    plugin: GraphPlugin;

    /**
     * @todo Documentation incomplete.
     */
    onExternalSettingsChange(): Promise<void>;

    /**
     * @todo Documentation incomplete.
     */
    onFileMenu(menu: Menu, file: TAbstractFile, source: string, leaf?: WorkspaceLeaf): void;

    /**
     * @todo Documentation incomplete.
     */
    openGraphView(newLeaf: boolean): void;

    /**
     * @todo Documentation incomplete.
     */
    openLocalGraph(checking: boolean): true | undefined;

    /**
     * Saves the options in graph.json.
     */
    saveOptions(): void;
}
