import { Setting } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the Setting constructor.
 *
 * @returns The Setting constructor.
 *
 * @public
 * @unofficial
 */
export function getSettingConstructor(): ExtractConstructor<Setting> {
  return Setting as ExtractConstructor<Setting>;
}
