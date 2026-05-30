import { ImageValue } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#ImageValue} constructor.
 *
 * @returns The {@link obsidian#ImageValue} constructor.
 *
 * @public
 * @unofficial
 */
export function getImageValueConstructor(): ExtractConstructor<ImageValue> {
  return ImageValue as ExtractConstructor<ImageValue>;
}
