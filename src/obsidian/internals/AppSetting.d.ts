import type {
    CloseableComponent,
    Modal,
    SettingTab
} from 'obsidian';
import type { HotkeysSettingTab } from './HotkeysSettingTab.d.ts';

/** @public @unofficial */
export interface AppSetting extends Modal {
    /**
     * Current active tab of the settings modal
     */
    activeTab: SettingTab | null;
    /**
     * Closeable component for the active tab
     */
    activeTabCloseable: CloseableComponent | null;
    /** @internal Container element containing the community plugins */
    communityPluginTabContainer: HTMLElement;
    /** @internal Container element containing the community plugins header */
    communityPluginTabHeaderGroup: HTMLElement;
    /** @internal Container element containing the core plugins */
    corePluginTabContainer: HTMLElement;
    /** @internal Container element containing the core plugins header */
    corePluginTabHeaderGroup: HTMLElement;
    /**
     * Previously opened tab ID
     */
    lastTabId: string;
    /**
     * List of all plugin tabs (core and community, ordered by precedence)
     */
    pluginTabs: SettingTab[];
    /**
     * List of all core settings tabs (editor, files & links, ...)
     */
    settingTabs: SettingTab[];
    /** @internal Container element containing the core settings */
    tabContainer: HTMLElement;
    /** @internal Container for currently active settings tab */
    tabContentContainer: HTMLElement;
    /** @internal Container for all settings tabs */
    tabHeadersEl: HTMLElement;

    /**
     * @param tab - Tab to add
     * @internal Add a new plugin tab to the settings modal
     */
    addSettingTab(tab: SettingTab): void;
    /** @internal Closes the currently active tab */
    closeActiveTab(): void;
    /**
     * @param tab - Tab to check
     * @internal Check whether tab is a plugin tab
     */
    isPluginSettingTab(tab: SettingTab): boolean;
    /**
     * @param tab - Tab to open
     * @internal Open a specific tab by tab reference
     */
    openTab(tab: SettingTab): void;
    openTabById(id: 'hotkeys'): HotkeysSettingTab;
    /**
     * Open a specific tab by ID
     *
     * @param id - ID of the tab to open
     */
    openTabById(id: string): SettingTab;
    /**
     * @param tab - Tab to remove
     * @internal Remove a plugin tab from the settings modal
     */
    removeSettingTab(tab: SettingTab): void;
    /**
     * @param tab - Tab to update the title to
     * @internal Update the title of the modal
     */
    updateModalTitle(tab: SettingTab): void;
    /** @internal Update a tab section */
    updatePluginSection(): void;
}
