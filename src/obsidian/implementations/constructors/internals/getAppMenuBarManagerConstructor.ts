import type { App } from 'obsidian';
import type { AppMenuBarManager } from '../../../internals/AppMenuBarManager.d.ts';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the AppMenuBarManager constructor.
 *
 * @param app - The app instance.
 * @returns The AppMenuBarManager constructor.
 *
 * @public
 * @unofficial
 */
export function getAppMenuBarManagerConstructor(app: App): ExtractConstructor<AppMenuBarManager> {
  return app.appMenuBarManager.constructor as ExtractConstructor<AppMenuBarManager>;
}
