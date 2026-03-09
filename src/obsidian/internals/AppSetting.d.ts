import type {
  App,
  CloseableComponent,
  Modal,
  SettingTab
} from 'obsidian';
import type { getAppSettingConstructor } from '../implementations/constructors/internals/getAppSettingConstructor.d.ts';
import type { HotkeysSettingTab } from './HotkeysSettingTab.d.ts';

/**
 * The settings modal for the application, managing core and plugin setting tabs.
 * @public
 * @unofficial
 */
export interface AppSetting extends Modal {
  /**
   * Current active tab of the settings modal.
   */
  activeTab: SettingTab | null;

  /**
   * Closeable component for the active tab.
   */
  activeTabCloseable: CloseableComponent | null;

  /**
   * Container element containing the community plugins
   */
  communityPluginTabContainer: HTMLElement;

  /**
   * Container element containing the community plugins header.
   */
  communityPluginTabHeaderGroup: HTMLElement;

  /**
   * Container element containing the core plugins.
   */
  corePluginTabContainer: HTMLElement;

  /**
   * Container element containing the core plugins header.
   */
  corePluginTabHeaderGroup: HTMLElement;

  /** Feedback banner element. */
  feedbackBanner: unknown;

  /**
   * Previously opened tab ID.
   */
  lastTabId: string;

  /**
   * List of all plugin tabs (core and community, ordered by precedence).
   */
  pluginTabs: SettingTab[];

  /**
   * List of all core settings tabs (editor, files & links, ...).
   */
  settingTabs: SettingTab[];

  /**
   * Container element containing the core settings.
   */
  tabContainer: HTMLElement;

  /**
   * Container for currently active settings tab.
   */
  tabContentContainer: HTMLElement;

  /**
   * Container for all settings tabs.
   */
  tabHeadersEl: HTMLElement;

  /**
   * Add a new plugin tab to the settings modal.
   *
   * @param tab - Tab to add.
   */
  addSettingTab(tab: SettingTab): void;

  /**
   * Closes the currently active tab.
   */
  closeActiveTab(): void;

  /**
   * Constructor.
   *
   * To get the constructor instance, use {@link getAppSettingConstructor} from `obsidian-typings/implementations`.
   *
   * @param app - The app.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor__(app: App): this;

  /**
   * Check whether tab is a plugin tab.
   *
   * @param tab - Tab to check.
   * @returns Whether the tab is a plugin setting tab.
   */
  isPluginSettingTab(tab: SettingTab): boolean;

  /**
   * Open a specific tab by tab reference.
   *
   * @param tab - Tab to open.
   */
  openTab(tab: SettingTab): void;

  /**
   * Open the hotkeys setting tab by ID.
   *
   * @param id - The hotkeys tab ID.
   * @returns The hotkeys setting tab.
   */
  openTabById(id: 'hotkeys'): HotkeysSettingTab;

  /**
   * Open a specific tab by ID.
   *
   * @param id - ID of the tab to open.
   * @returns The opened setting tab.
   */
  openTabById(id: string): SettingTab;

  /**
   * Remove a plugin tab from the settings modal.
   *
   * @param tab - Tab to remove.
   */
  removeSettingTab(tab: SettingTab): void;

  /**
   * Update the title of the modal.
   *
   * @param tab - Tab to update the title to.
   */
  updateModalTitle(tab: SettingTab): void;

  /**
   * Update a tab section.
   */
  updatePluginSection(): void;
}
