import type { App } from 'obsidian';

import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { WorkspacesPlugin } from './WorkspacesPlugin.d.ts';

/**
 * Plugin instance for workspaces, managing saving and loading of workspace layouts.
 *
 * @public
 * @unofficial
 */
export interface WorkspacesPluginInstance extends InternalPluginInstance<WorkspacesPlugin> {
  /**
   * Name of the active workspace, or an empty string when none is active.
   */
  activeWorkspace: string;

  /**
   * Reference to the app.
   */
  app: App;

  /**
   * Reference to the workspaces plugin registration.
   */
  plugin: WorkspacesPlugin;

  /**
   * Saved workspaces, keyed by name. Each value is the result of `app.workspace.getLayout()` at the time
   * of saving, plus an `mtime` string formatted by `moment().format()`.
   */
  workspaces: Record<string, Record<string, unknown>>;

  /**
   * Delete a saved workspace and persist the plugin data.
   *
   * @param name - The name of the workspace to delete.
   * @returns A promise that resolves when the plugin data is saved.
   */
  deleteWorkspace(name: string): Promise<void>;

  /**
   * Load a saved workspace: make it active, apply its layout through `app.workspace.changeLayout()` and
   * persist the plugin data. Does nothing when no workspace has that name.
   *
   * @param name - The name of the workspace to load.
   * @returns A promise that resolves when the layout is applied.
   */
  loadWorkspace(name: string): Promise<void>;

  /**
   * Called when the plugin is disabled; persists the plugin data.
   *
   * @param app - The app instance.
   * @param plugin - The workspaces plugin registration.
   * @returns A promise that resolves when the plugin data is saved.
   */
  onDisable(app: App, plugin: WorkspacesPlugin): Promise<void>;

  /**
   * Called when the plugin is enabled; loads the saved workspaces and registers the CLI handlers.
   *
   * @param app - The app instance.
   * @param plugin - The workspaces plugin registration.
   * @returns A promise that resolves when the plugin is enabled.
   */
  onEnable(app: App, plugin: WorkspacesPlugin): Promise<void>;

  /**
   * Callback of the `workspaces:load` command; opens the workspace load modal.
   *
   * @returns Always `false`.
   */
  onLoad(): boolean;

  /**
   * Callback of the ribbon item and the `workspaces:open-modal` command; opens the workspace management modal.
   */
  onOpenModal(): void;

  /**
   * Callback of the `workspaces:save` command; saves the active workspace, or opens the management modal
   * when none is active.
   */
  onSave(): void;

  /**
   * Callback of the `workspaces:save-and-load` command; opens the workspace load modal that saves the
   * active workspace first.
   *
   * @returns Always `false`.
   */
  onSaveAndLoad(): boolean;

  /**
   * Persist the saved workspaces and the active workspace name to the plugin data.
   *
   * @returns A promise that resolves when the plugin data is saved.
   */
  saveData(): Promise<void>;

  /**
   * Save the current workspace layout under a name and persist the plugin data.
   *
   * @param name - The name to save the workspace under.
   */
  saveWorkspace(name: string): void;

  /**
   * Set the active workspace name and persist the plugin data.
   *
   * @param name - The name of the workspace to make active.
   */
  setActiveWorkspace(name: string): void;
}
