import { QueryController } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#QueryController} constructor.
 *
 * @returns The {@link obsidian#QueryController} constructor.
 *
 * @public
 * @unofficial
 */
export function getQueryControllerConstructor(): ExtractConstructor<QueryController> {
  return QueryController as ExtractConstructor<QueryController>;
}
