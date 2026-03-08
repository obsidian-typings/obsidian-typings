import type { App } from 'obsidian';
import type { HotkeyManagerConstructor } from '../../../internals/constructors/internals/HotkeyManagerConstructor.ts';

/**
 * Get the HotkeyManager constructor.
 *
 * @param app - The app instance.
 * @returns The HotkeyManager constructor.
 *
 * @public
 * @unofficial
 */
export function getHotkeyManagerConstructor(app: App): HotkeyManagerConstructor {
    return app.hotkeyManager.constructor as HotkeyManagerConstructor;
}
