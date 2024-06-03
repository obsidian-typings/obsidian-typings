import { Modal } from "./Modal.d.ts";
import { SettingTab } from "./SettingTab.d.ts";

export default interface Setting extends Modal {
    /**
     * Current active tab of the settings modal
     */
    activateTab: SettingTab;
    /** @internal Container element containing the community plugins */
    communityPluginTabContainer: HTMLElement;
    /** @internal Container element containing the community plugins header */
    communityPluginTabHeaderGroup: HTMLElement;
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
     * @param tab Tab to add
     * @internal Add a new plugin tab to the settings modal
     */
    addSettingTab(tab: SettingTab): void;
    /** @internal Closes the currently active tab */
    closeActiveTab(): void;
    /**
     * @param tab Tab to check
     * @internal Check whether tab is a plugin tab
     */
    isPluginSettingTab(tab: SettingTab): boolean;
    /**
     * @param tab Tab to open
     * @internal Open a specific tab by tab reference
     */
    openTab(tab: SettingTab): void;
    /**
     * Open a specific tab by ID
     *
     * @param id ID of the tab to open
     */
    openTabById(id: string): void;
    /**
     * @param tab Tab to remove
     * @internal Remove a plugin tab from the settings modal
     */
    removeSettingTab(tab: SettingTab): void;
    /**
     * @param tab Tab to update the title to
     * @internal Update the title of the modal
     */
    updateModalTitle(tab: SettingTab): void;
    /** @internal Update a tab section */
    updatePluginSection(): void;
}
