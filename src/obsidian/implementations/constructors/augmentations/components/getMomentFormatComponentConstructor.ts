import {
  MomentFormatComponent
} from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the MomentFormatComponent constructor.
 *
 * @returns The MomentFormatComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getMomentFormatComponentConstructor(): ExtractConstructor<MomentFormatComponent> {
  return MomentFormatComponent as ExtractConstructor<MomentFormatComponent>;
}
