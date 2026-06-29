import type {
  App,
  Debouncer,
  Menu,
  TAbstractFile,
  TFile,
  TFolder,
  WorkspaceLeaf
} from 'obsidian';

import type { PromisedQueue } from '../../PromisedQueue.d.ts';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { CanvasDataManager } from './CanvasDataManager.d.ts';
import type { CanvasIndex } from './CanvasIndex.d.ts';
import type { CanvasPlugin } from './CanvasPlugin.d.ts';
import type { CanvasPluginInstanceOptions } from './CanvasPluginInstanceOptions.d.ts';

/**
 * Plugin instance for the Canvas internal plugin, managing canvas indexing, data, and rename operations.
 *
 * @public
 * @unofficial
 */
export interface CanvasPluginInstance extends InternalPluginInstance<CanvasPlugin> {
  /**
   * Reference to the Obsidian app instance.
   */
  app: App;

  /**
   * Whether this plugin is enabled by default.
   */
  defaultOn: true;

  /**
   * Index for resolving links and embeds within canvas files.
   */
  index: CanvasIndex;

  /**
   * Manager for loading, saving, and handling canvas local data.
   */
  localDataManager: CanvasDataManager;

  /**
   * User-configurable options for the canvas plugin.
   */
  options: CanvasPluginInstanceOptions;

  /**
   * Reference to the parent canvas plugin.
   */
  plugin: CanvasPlugin;

  /**
   * Queue for processing file rename operations sequentially.
   */
  renameQueue: PromisedQueue;

  /**
   * Pending rename operations to be processed.
   */
  renames: unknown[];

  /**
   * Debounced function to process pending rename operations.
   */
  requestProcessRename: Debouncer<[], unknown>;

  /**
   * Creates a new canvas file.
   *
   * @param location - The parent folder. Defaults to the configured new-file location.
   * @param filename - The file name (without extension).
   * @param contents - The initial file contents.
   * @returns A promise resolving to the created file.
   */
  createNewCanvasFile(location?: TFolder, filename?: string, contents?: string): Promise<TFile>;

  /**
   * Gets the folder a new canvas file should be created in.
   *
   * @param sourcePath - The path of the current file.
   * @param newFilePath - The path of the file being created.
   * @returns The destination folder.
   */
  getNewFileParent(sourcePath: string, newFilePath?: string): TFolder;

  /**
   * Handles deletion of a canvas file.
   *
   * @param file - The deleted file.
   */
  onDelete(file: TAbstractFile): void;

  /**
   * Handles a settings change made externally (e.g. by Sync).
   *
   * @returns A promise that resolves when the change has been handled.
   */
  onExternalSettingsChange(): Promise<void>;

  /**
   * Adds canvas-related items to the file context menu.
   *
   * @param menu - The menu to add to.
   * @param file - The file or folder the menu was opened on.
   * @param source - The source of the menu (e.g. `'file-explorer-context-menu'`).
   * @param leaf - The leaf the menu was opened from.
   */
  onFileMenu(menu: Menu, file: TAbstractFile, source: string, leaf?: WorkspaceLeaf): void;

  /**
   * Handles renaming of a canvas file.
   *
   * @param file - The renamed file.
   * @param oldPath - The previous path of the file.
   */
  onRename(file: TAbstractFile, oldPath: string): void;

  /**
   * Re-renders all open canvas views.
   */
  rerenderCanvases(): void;

  /**
   * Persists the plugin's options.
   */
  saveOptions(): void;
}
