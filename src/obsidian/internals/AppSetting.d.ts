import type {
  App,
  EventRef,
  Modal,
  SearchComponent,
  SettingTab
} from 'obsidian';

import type { getAppSettingConstructor } from '../implementations/constructors/internals/getAppSettingConstructor.d.ts';
import type { HotkeysSettingTab } from './HotkeysSettingTab.d.ts';

/**
 * The settings modal for the application, managing core and plugin setting tabs.
 *
 * @public
 * @unofficial
 */
export interface AppSetting extends Modal {
  /**
   * Current active tab of the settings modal.
   */
  activeTab: null | SettingTab;

  /**
   * Back button element shown in the title bar when a sub-page is open.
   */
  backButtonEl: HTMLElement;

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

  /**
   * Feedback banner element.
   */
  feedbackBanner: unknown;

  /**
   * Whether the settings search is currently active.
   */
  isSearchActive: boolean;

  /**
   * Previously opened tab ID.
   */
  lastTabId: string;

  /**
   * Timestamp of the last Vim `g` keypress, used to detect `gg`.
   */
  lastVimGTimestamp: number;

  /**
   * The stack of open sub-pages.
   */
  pageStack: unknown[];

  /**
   * List of all plugin tabs (core and community, ordered by precedence).
   */
  pluginTabs: SettingTab[];

  /**
   * The popout-window handle when the settings are popped out, or `null`.
   */
  popout: unknown;

  /**
   * The local-storage key used to persist the popout-window state.
   */
  popoutStorageKey: string;

  /**
   * The event reference for the workspace `quit` hook, or `null`.
   */
  quitRef: EventRef | null;

  /**
   * The search input component.
   */
  searchComponent: SearchComponent;

  /**
   * The internal index used to search settings.
   */
  searchIndex: unknown;

  /**
   * The navigable items shown for the current search results.
   */
  searchNavItems: unknown[];

  /**
   * The container element for search results.
   */
  searchResultsEl: HTMLElement;

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
   * The container element for the vertical tab header group.
   */
  tabGroupContainerEl: HTMLElement;

  /**
   * Container for all settings tabs.
   */
  tabHeadersEl: HTMLElement;

  /**
   * The navigable tab items in the sidebar.
   */
  tabNavItems: unknown[];

  /**
   * The element displaying the current page title.
   */
  titleTextEl: HTMLElement;

  /**
   * The `beforeunload` handler registered while popped out, or `null`.
   */
  unloadHandler: (() => void) | null;

  /**
   * Activates the navigable nav item matching the given element.
   *
   * @param el - The nav item element to activate.
   */
  activateNavItem(el: HTMLElement): void;

  /**
   * Activates the setting item for the given element (clicks it).
   *
   * @param el - The setting item element to activate.
   */
  activateSettingItem(el: HTMLElement): void;

  /**
   * Add a new plugin tab to the settings modal.
   *
   * @param tab - Tab to add.
   */
  addSettingTab(tab: SettingTab): void;

  /**
   * Closes and hides every open sub-page.
   */
  clearPageStack(): void;

  /**
   * Closes the currently active tab.
   */
  closeActiveTab(): void;

  /**
   * Closes the top-most sub-page.
   */
  closePage(): void;

  /**
   * Constructor.
   *
   * To get the constructor instance, use {@link getAppSettingConstructor} from `obsidian-typings/implementations`.
   *
   * @param app - The app.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor__?(app: App): this;

  /**
   * Focuses the given nav item.
   *
   * @param navItem - The nav item to focus.
   */
  focusNavItem(navItem: unknown): void;

  /**
   * Moves focus to the nav item at the given offset from the current one.
   *
   * @param direction - The offset to move by (e.g. `1` or `-1`).
   */
  focusNextNavItem(direction: number): void;

  /**
   * Moves focus to the setting item at the given offset from the given one.
   *
   * @param settingEl - The current setting item element.
   * @param direction - The offset to move by (e.g. `1` or `-1`).
   */
  focusNextSettingItem(settingEl: HTMLElement, direction: number): void;

  /**
   * Focuses the given setting item element.
   *
   * @param settingEl - The setting item element to focus.
   * @param focusVisible - Whether to show the focus ring.
   */
  focusSettingItem(settingEl: HTMLElement, focusVisible?: boolean): void;

  /**
   * Moves focus to the sidebar.
   */
  focusSidebar(): void;

  /**
   * Gets the root element of the current page.
   *
   * @returns The current page element, or `undefined` if none.
   */
  getCurrentPageEl(): HTMLElement | undefined;

  /**
   * Gets the currently navigable nav items (search results or tabs).
   *
   * @returns The navigable nav items.
   */
  getNavigableNavItems(): unknown[];

  /**
   * Gets the currently navigable setting item elements.
   *
   * @returns The navigable setting item elements.
   */
  getNavigableSettingItems(): HTMLElement[];

  /**
   * Gets the options used when popping the settings out into a window.
   *
   * @returns The popout options.
   */
  getPopoutOptions(): unknown;

  /**
   * Check whether tab is a plugin tab.
   *
   * @param tab - Tab to check.
   * @returns Whether the tab is a plugin setting tab.
   */
  isPluginSettingTab(tab: SettingTab): boolean;

  /**
   * Navigates to a search result, optionally scrolling to a specific definition.
   *
   * @param result - The search result to navigate to.
   * @param hit - The specific hit within the result to scroll to.
   */
  navigateToSearchResult(result: unknown, hit?: unknown): void;

  /**
   * Handles a change to the search query.
   */
  onSearchChanged(): void;

  /**
   * Opens a sub-page.
   *
   * @param page - The page to open.
   */
  openPage(page: unknown): void;

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
   * Rebuilds the sidebar tab nav items.
   */
  rebuildTabNavItems(): void;

  /**
   * Re-renders the current page for the given tab if it is active.
   *
   * @param tab - The tab whose page to refresh.
   */
  refreshCurrentPage(tab: SettingTab): void;

  /**
   * Re-runs the current search.
   */
  refreshSearch(): void;

  /**
   * Remove a plugin tab from the settings modal.
   *
   * @param tab - Tab to remove.
   */
  removeSettingTab(tab: SettingTab): void;

  /**
   * Scrolls to and focuses a setting definition within a tab.
   *
   * @param tab - The tab containing the definition.
   * @param definition - The definition to scroll to.
   */
  scrollToDefinition(tab: SettingTab, definition: unknown): void;

  /**
   * Update the title of the modal.
   *
   * @param tab - Tab to update the title to.
   */
  updateModalTitle(tab: SettingTab): void;

  /**
   * Updates the displayed page title from the current page or active tab.
   */
  updatePageTitle(): void;

  /**
   * Update a tab section.
   */
  updatePluginSection(): void;
}
