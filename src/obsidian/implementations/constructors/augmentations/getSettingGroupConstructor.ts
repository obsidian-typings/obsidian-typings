import {
  SettingGroup
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type SettingGroupConstructor = ExtractConstructor<SettingGroup>;

/**
 * Get the SettingGroup constructor.
 *
 * @returns The SettingGroup constructor.
 *
 * @public
 * @unofficial
 */
export function getSettingGroupConstructor(): SettingGroupConstructor {
  return SettingGroup as SettingGroupConstructor;
}
