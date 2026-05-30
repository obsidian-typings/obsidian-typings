import { MomentFormatComponent } from 'obsidian';

import type { ExtractConstructor } from '../../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#MomentFormatComponent} constructor.
 *
 * @returns The {@link obsidian#MomentFormatComponent} constructor.
 *
 * @public
 * @unofficial
 */
export function getMomentFormatComponentConstructor(): ExtractConstructor<MomentFormatComponent> {
  return MomentFormatComponent as ExtractConstructor<MomentFormatComponent>;
}
