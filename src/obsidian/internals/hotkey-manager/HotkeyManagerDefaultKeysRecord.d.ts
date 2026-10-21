import type { Hotkey } from 'obsidian';

/**
 * Record mapping command IDs to their default hotkey bindings.
 *
 * @public
 * @unofficial
 */
export interface HotkeyManagerDefaultKeysRecord extends Record<string, Hotkey[]> {}
