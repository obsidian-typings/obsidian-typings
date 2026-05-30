import { BaseComponent } from 'obsidian';

import type { ExtractConstructor } from '../../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#BaseComponent} constructor.
 *
 * @returns The {@link obsidian#BaseComponent} constructor.
 *
 * @public
 * @unofficial
 */
export function getBaseComponentConstructor(): ExtractConstructor<BaseComponent> {
  return BaseComponent as ExtractConstructor<BaseComponent>;
}
