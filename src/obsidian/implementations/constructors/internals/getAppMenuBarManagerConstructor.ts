import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';
import type { AppMenuBarManager } from '../../../internals/AppMenuBarManager.d.ts';

type AppMenuBarManagerConstructor = ExtractConstructor<AppMenuBarManager>;

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
