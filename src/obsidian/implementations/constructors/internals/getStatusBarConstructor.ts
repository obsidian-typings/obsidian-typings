import type { App } from 'obsidian';
import type { StatusBarConstructor } from '../../../internals/constructors/internals/StatusBarConstructor.d.ts';

/**
 * Get the StatusBar constructor.
 *
 * @param app - The app instance.
 * @returns The StatusBar constructor.
 *
 * @public
 * @unofficial
 */
export function getStatusBarConstructor(app: App): StatusBarConstructor {
    return app.statusBar.constructor as StatusBarConstructor;
}
