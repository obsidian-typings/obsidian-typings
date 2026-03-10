import {
  ExtraButtonComponent
} from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the ExtraButtonComponent constructor.
 *
 * @returns The ExtraButtonComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getExtraButtonComponentConstructor(): ExtractConstructor<ExtraButtonComponent> {
  return ExtraButtonComponent as ExtractConstructor<ExtraButtonComponent>;
}
