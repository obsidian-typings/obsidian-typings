import type {
    SearchComponent,
    SettingTab
} from "obsidian";

/** @public */
export interface HotkeysSettingTab extends SettingTab {
    searchComponent: SearchComponent;
    updateHotkeyVisibility(): void;
}
