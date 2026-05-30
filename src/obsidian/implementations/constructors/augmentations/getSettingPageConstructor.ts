import { SettingPage } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the SettingPage constructor.
 *
 * @returns The SettingPage constructor.
 *
 * @public
 * @unofficial
 */
export function getSettingPageConstructor(): ExtractConstructor<SettingPage> {
  return SettingPage as ExtractConstructor<SettingPage>;
}
