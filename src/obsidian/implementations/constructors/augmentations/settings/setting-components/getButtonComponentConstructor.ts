import { ButtonComponent } from 'obsidian';

import type { ExtractConstructor } from '../../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#ButtonComponent} constructor.
 *
 * @returns The {@link obsidian#ButtonComponent} constructor.
 *
 * @public
 * @unofficial
 */
export function getButtonComponentConstructor(): ExtractConstructor<ButtonComponent> {
  return ButtonComponent as ExtractConstructor<ButtonComponent>;
}
