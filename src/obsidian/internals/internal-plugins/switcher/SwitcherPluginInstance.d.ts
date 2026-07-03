import type {
  App,
  Modal
} from 'obsidian';

import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { SwitcherPlugin } from './SwitcherPlugin.d.ts';

/**
 * Plugin instance for the quick switcher, providing fuzzy file search and navigation.
 *
 * @public
 * @unofficial
 */
export interface SwitcherPluginInstance extends InternalPluginInstance<SwitcherPlugin> {
  /**
   * The currently open quick-switcher modal, or `null` if none is open.
   */
  activeModal: Modal | null;

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
   * Reference to the switcher plugin registration.
   */
  plugin: SwitcherPlugin;

  /**
   * The quick-switcher modal constructor.
   */
  QuickSwitcherModal: unknown;

  /**
   * Handles a settings change made externally (e.g. by Sync).
   *
   * @returns A promise that resolves when the change has been handled.
   */
  onExternalSettingsChange(): Promise<void>;

  /**
   * Opens the quick switcher.
   *
   * @returns A promise that resolves when the switcher is open.
   */
  onOpen(): Promise<void>;
}
