import type {
    SearchComponent,
    SettingTab
} from 'obsidian';

/**
 * @public
 * @unofficial
 */
export interface HotkeysSettingTab extends SettingTab {
    /** @todo Documentation incomplete. */
    searchComponent: SearchComponent;

    /** @todo Documentation incomplete. */
    updateHotkeyVisibility(): void;
}
