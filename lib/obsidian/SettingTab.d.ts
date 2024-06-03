import { Setting } from "./Setting.d.ts";

export default interface SettingTab {
    /**
     * Unique ID of the tab
     */
    id: string;
    /**
     * Reference to installed plugins element
     *
     * @if Tab is the community plugins tab
     */
    installedPluginsEl?: HTMLElement;
    /**
     * Sidebar name of the tab
     */
    name: string;
    /**
     * Sidebar navigation element of the tab
     */
    navEl: HTMLElement;
    /**
     * Reference to the plugin that initialized the tab
     *
     * @if Tab is a plugin tab
     */
    plugin?: Plugin;
    /**
     * Reference to the settings modal
     */
    setting: Setting;
}
