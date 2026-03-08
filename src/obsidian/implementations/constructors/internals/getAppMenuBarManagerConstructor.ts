import type { App } from 'obsidian';
import type { AppMenuBarManagerConstructor } from '../../../internals/constructors/internals/AppMenuBarManagerConstructor.ts';

/**
 * Get the AppMenuBarManager constructor.
 *
 * @param app - The app instance.
 * @returns The AppMenuBarManager constructor.
 *
 * @public
 * @unofficial
 */
export function getAppMenuBarManagerConstructor(app: App): AppMenuBarManagerConstructor {
    return app.appMenuBarManager.constructor as AppMenuBarManagerConstructor;
}
