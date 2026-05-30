import { AbstractTextComponent } from 'obsidian';

import type { ExtractConstructor } from '../../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#AbstractTextComponent} constructor.
 *
 * @returns The {@link obsidian#AbstractTextComponent} constructor.
 *
 * @public
 * @unofficial
 */
export function getAbstractTextComponentConstructor(): ExtractConstructor<
  AbstractTextComponent<HTMLInputElement | HTMLTextAreaElement>
> {
  return AbstractTextComponent as ExtractConstructor<
    AbstractTextComponent<HTMLInputElement | HTMLTextAreaElement>
  >;
}
