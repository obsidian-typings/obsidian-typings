import { SettingTab } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#SettingTab} constructor.
 *
 * @returns The {@link obsidian#SettingTab} constructor.
 *
 * @public
 * @unofficial
 */
export function getSettingTabConstructor(): ExtractConstructor<SettingTab> {
  return SettingTab as unknown as ExtractConstructor<SettingTab>;
}
