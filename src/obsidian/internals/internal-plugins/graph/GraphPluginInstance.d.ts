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

  /**
   * Reload options when settings are changed externally.
   *
   * @returns A promise that resolves when the settings are reloaded.
   */
  onExternalSettingsChange(): Promise<void>;

  /**
   * Add graph-related items to the file context menu.
   *
   * @param menu - The context menu to add items to.
   * @param file - The file associated with the menu.
   * @param source - The source of the menu event.
   * @param leaf - The workspace leaf, if available.
   */
  onFileMenu(menu: Menu, file: TAbstractFile, source: string, leaf?: WorkspaceLeaf): void;

  /**
   * Open the global graph view.
   *
   * @param newLeaf - Whether to open the graph in a new leaf.
   */
  openGraphView(newLeaf: boolean): void;

  /**
   * Open the local graph view for the current file.
   *
   * @param checking - Whether to only check if the command can be executed.
   * @returns `true` if the command can be executed, or `undefined`.
   */
  openLocalGraph(checking: boolean): true | undefined;

  /**
   * Saves the options in graph.json.
   */
  saveOptions(): void;
}
