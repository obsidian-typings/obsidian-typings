import type {
  App,
  Editor,
  Menu,
  TAbstractFile
} from 'obsidian';

import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { GlobalSearchPlugin } from './GlobalSearchPlugin.d.ts';

/**
 * Plugin instance for global search, providing vault-wide text search functionality.
 *
 * @public
 * @unofficial
 */
export interface GlobalSearchPluginInstance extends InternalPluginInstance<GlobalSearchPlugin> {
  /**
   * Reference to the app.
   */
  app: App;

  /**
   * Whether this plugin is enabled by default.
   */
  defaultOn: true;

  /**
   * The plugin's options.
   */
  options: unknown;

  /**
   * Reference to the global search plugin registration.
   */
  plugin: GlobalSearchPlugin;

  /**
   * Gets the current global-search query string.
   *
   * @returns The current query, or an empty string when the search view is not open.
   */
  getGlobalSearchQuery(): string;

  /**
   * Ensures the global-search leaf exists in the left sidebar.
   */
  initLeaf(): void;

  /**
   * Adds a "Search in selection" item to the editor context menu.
   *
   * @param menu - The menu to add to.
   * @param editor - The editor the menu was opened in.
   */
  onEditorMenu(menu: Menu, editor: Editor): void;

  /**
   * Handles a settings change made externally (e.g. by Sync).
   *
   * @returns A promise that resolves when the change has been handled.
   */
  onExternalSettingsChange(): Promise<void>;

  /**
   * Adds a "Search in folder" item to the file context menu.
   *
   * @param menu - The menu to add to.
   * @param file - The file or folder the menu was opened on.
   * @param source - The source of the menu (e.g. `'file-explorer-context-menu'`).
   */
  onFileMenu(menu: Menu, file: TAbstractFile, source: string): void;

  /**
   * Opens the global search with the given query.
   *
   * @param query - The search query.
   * @param active - Whether to focus the search view. Defaults to `true`.
   */
  openGlobalSearch(query: string, active?: boolean): void;
}
