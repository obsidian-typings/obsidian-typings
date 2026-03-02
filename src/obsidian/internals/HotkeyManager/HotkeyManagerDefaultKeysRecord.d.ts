import type { KeymapInfo } from 'obsidian';

/**
 * Record mapping command IDs to their default hotkey bindings.
 * @public
 * @unofficial
 */
export interface HotkeyManagerDefaultKeysRecord extends Record<string, KeymapInfo[]> {}
