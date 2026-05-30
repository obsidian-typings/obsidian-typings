import { Setting } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#Setting} constructor.
 *
 * @returns The {@link obsidian#Setting} constructor.
 *
 * @public
 * @unofficial
 */
export function getSettingConstructor(): ExtractConstructor<Setting> {
  return Setting as ExtractConstructor<Setting>;
}
