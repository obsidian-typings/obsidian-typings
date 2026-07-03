import { SettingGroup } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#SettingGroup} constructor.
 *
 * @returns The {@link obsidian#SettingGroup} constructor.
 *
 * @public
 * @unofficial
 */
export function getSettingGroupConstructor(): ExtractConstructor<SettingGroup> {
  return SettingGroup as ExtractConstructor<SettingGroup>;
}
