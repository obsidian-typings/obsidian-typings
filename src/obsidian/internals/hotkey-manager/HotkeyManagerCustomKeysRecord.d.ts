import type { Hotkey } from 'obsidian';

/**
 * Record mapping command IDs to their user-customized hotkey bindings.
 *
 * @public
 * @unofficial
 */
export interface HotkeyManagerCustomKeysRecord extends Record<string, Hotkey[]> {}
