import { ExtraButtonComponent } from 'obsidian';

import type { ExtractConstructor } from '../../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#ExtraButtonComponent} constructor.
 *
 * @returns The {@link obsidian#ExtraButtonComponent} constructor.
 *
 * @public
 * @unofficial
 */
export function getExtraButtonComponentConstructor(): ExtractConstructor<ExtraButtonComponent> {
  return ExtraButtonComponent as ExtractConstructor<ExtraButtonComponent>;
}
