import type { App } from 'obsidian';
import type { AppSetting } from '../../AppSetting.d.ts';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The AppSetting constructor.
 *
 * @public
 * @unofficial
 */
export interface AppSettingConstructor extends ConstructorBase<[app: App], AppSetting> {}
