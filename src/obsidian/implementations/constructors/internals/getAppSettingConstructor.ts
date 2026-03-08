import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';
import type { AppSetting } from '../../../internals/AppSetting.d.ts';

/**
 * Get the AppSetting constructor.
 *
 * @param app - The app instance.
 * @returns The AppSetting constructor.
 *
 * @public
 * @unofficial
 */
export function getAppSettingConstructor(app: App): ExtractConstructor<AppSetting> {
    return app.setting.constructor as ExtractConstructor<AppSetting>;
}
