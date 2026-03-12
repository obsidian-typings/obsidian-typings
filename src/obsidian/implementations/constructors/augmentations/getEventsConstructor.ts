import { Events } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the Events constructor.
 *
 * @returns The Events constructor.
 *
 * @public
 * @unofficial
 */
export function getEventsConstructor(): ExtractConstructor<Events> {
  return Events as ExtractConstructor<Events>;
}
