import type {
  App,
  Menu,
  TAbstractFile
} from 'obsidian';

import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { FileExplorerPlugin } from './FileExplorerPlugin.d.ts';

/**
 * Plugin instance for the file explorer, managing the file tree sidebar view.
 *
 * @public
 * @unofficial
 */
export interface FileExplorerPluginInstance extends InternalPluginInstance<FileExplorerPlugin> {
  /**
   * Reference to the app.
   */
  app: App;

  /**
   * Whether this plugin is enabled by default.
   */
  defaultOn: true;

  /**
   * Reference to the file explorer plugin registration.
   */
  plugin: FileExplorerPlugin;

  /**
   * Ensures the file explorer leaf exists in the left sidebar.
   */
  initLeaf(): void;

  /**
   * Adds file-explorer items to the file context menu.
   *
   * @param menu - The menu to add to.
   * @param file - The file or folder the menu was opened on.
   * @param source - The source of the menu (e.g. `'file-explorer-context-menu'`).
   */
  onFileMenu(menu: Menu, file: TAbstractFile, source: string): void;

  /**
   * Reveals a file or folder in the file explorer view, opens the view if it is not already.
   * open/visible.
   *
   * @param item - The file or folder to reveal.
   */
  revealInFolder(item: TAbstractFile): void;
}
