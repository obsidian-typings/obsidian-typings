import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { WorkspacesPlugin } from './WorkspacesPlugin.d.ts';

/**
 * Plugin instance for workspaces, managing saving and loading of workspace layouts.
 * @public
 * @unofficial
 */
export interface WorkspacesPluginInstance extends InternalPluginInstance<WorkspacesPlugin> {
  /** Reference to the app. */
  app: App;

  /** Reference to the workspaces plugin registration. */
  plugin: WorkspacesPlugin;
}
