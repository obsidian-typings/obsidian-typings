import type { App } from 'obsidian';
import type { AppSettingConstructor } from '../../../internals/constructors/internals/AppSettingConstructor.d.ts';

/**
 * Get the AppSetting constructor.
 *
 * @param app - The app instance.
 * @returns The AppSetting constructor.
 *
 * @public
 * @unofficial
 */
export function getAppSettingConstructor(app: App): AppSettingConstructor {
    return app.setting.constructor as AppSettingConstructor;
}
