import type {
  SearchComponent,
  SettingTab
} from 'obsidian';

/**
 * Setting tab for viewing and editing keyboard hotkeys.
 * @public
 * @unofficial
 */
export interface HotkeysSettingTab extends SettingTab {
  /** Search component for filtering hotkeys by name. */
  searchComponent: SearchComponent;

  /** Update visibility of hotkey entries based on the current search filter. */
  updateHotkeyVisibility(): void;
}
