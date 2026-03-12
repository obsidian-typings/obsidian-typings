import { BaseComponent } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the BaseComponent constructor.
 *
 * @returns The BaseComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getBaseComponentConstructor(): ExtractConstructor<BaseComponent> {
  return BaseComponent as ExtractConstructor<BaseComponent>;
}
