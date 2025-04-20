import type {
    SearchComponent,
    SettingTab
} from 'obsidian';

/**
 * @public
 * @unofficial
 */
export interface HotkeysSettingTab extends SettingTab {
    searchComponent: SearchComponent;

    updateHotkeyVisibility(): void;
}
