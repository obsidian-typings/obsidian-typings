import { QueryController } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the QueryController constructor.
 *
 * @returns The QueryController constructor.
 *
 * @public
 * @unofficial
 */
export function getQueryControllerConstructor(): ExtractConstructor<QueryController> {
  return QueryController as ExtractConstructor<QueryController>;
}
