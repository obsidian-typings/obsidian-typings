import type { App } from 'obsidian';
import type { AppSetting } from '../../../internals/AppSetting.d.ts';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

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
