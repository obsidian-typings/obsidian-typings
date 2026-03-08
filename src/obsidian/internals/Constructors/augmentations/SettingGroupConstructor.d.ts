import type { SettingGroup } from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The SettingGroup constructor.
 *
 * @public
 * @unofficial
 */
export interface SettingGroupConstructor extends ConstructorBase<[containerEl: HTMLElement], SettingGroup> {}
