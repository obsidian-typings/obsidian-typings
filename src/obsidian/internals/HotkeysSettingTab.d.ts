import type {
  SearchComponent,
  SettingTab
} from 'obsidian';

import type { CustomArrayDict } from './collections/CustomArrayDict.d.ts';

/**
 * Setting tab for viewing and editing keyboard hotkeys.
 *
 * @public
 * @unofficial
 */
export interface HotkeysSettingTab extends SettingTab {
  /**
   * Display names of the commands whose hotkey is also assigned to another command, rebuilt by {@link HotkeysSettingTab.recomputeConflicts}.
   */
  conflicts: Set<string>;

  /**
   * Display names of the commands bound to each hotkey, keyed by the printed hotkey (e.g. `Ctrl + P`), rebuilt by {@link HotkeysSettingTab.recomputeConflicts}.
   */
  hotkeyToCommands: CustomArrayDict<string>;

  /**
   * Search component for filtering hotkeys by name.
   */
  searchComponent: SearchComponent;

  /**
   * Rebuild {@link HotkeysSettingTab.hotkeyToCommands} and {@link HotkeysSettingTab.conflicts} from the current hotkeys, and update the conflicts filter.
   */
  recomputeConflicts(): void;

  /**
   * Update visibility of hotkey entries based on the current search filter.
   */
  updateHotkeyVisibility(): void;
}
