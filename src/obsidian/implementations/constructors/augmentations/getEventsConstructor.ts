import { Events } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#Events} constructor.
 *
 * @returns The {@link obsidian#Events} constructor.
 *
 * @public
 * @unofficial
 */
export function getEventsConstructor(): ExtractConstructor<Events> {
  return Events as ExtractConstructor<Events>;
}
