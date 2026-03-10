import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';
import type { HotkeyManager } from '../../../internals/hotkey-manager/HotkeyManager.d.ts';

/**
 * Get the HotkeyManager constructor.
 *
 * @param app - The app instance.
 * @returns The HotkeyManager constructor.
 *
 * @public
 * @unofficial
 */
export function getHotkeyManagerConstructor(app: App): ExtractConstructor<HotkeyManager> {
  return app.hotkeyManager.constructor as ExtractConstructor<HotkeyManager>;
}
