import type {
  CliFlags,
  CliHandler,
  SettingTab
} from 'obsidian';

import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { FileExplorerPluginInstance } from './FileExplorerPluginInstance.d.ts';

/**
 * Internal plugin registration for the file explorer sidebar.
 *
 * @public
 * @unofficial
 */
export interface FileExplorerPlugin extends InternalPlugin<FileExplorerPluginInstance> {
  /**
   * The plugin's registered setting tab, if any.
   */
  settingTab?: SettingTab;

  /**
   * Registers a CLI handler for the file explorer.
   *
   * @param command - The command ID.
   * @param description - The help/autocomplete description.
   * @param flags - The CLI flags, or `null`.
   * @param handler - The handler callback.
   */
  registerCliHandler(command: string, description: string, flags: CliFlags | null, handler: CliHandler): void;
}
