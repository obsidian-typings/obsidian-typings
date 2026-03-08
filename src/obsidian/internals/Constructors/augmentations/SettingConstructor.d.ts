import type { Setting } from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The Setting constructor.
 *
 * @public
 * @unofficial
 */
export interface SettingConstructor extends ConstructorBase<[containerEl: HTMLElement], Setting> {}
