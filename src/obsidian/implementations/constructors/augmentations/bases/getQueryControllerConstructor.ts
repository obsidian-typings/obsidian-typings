import {
  QueryController
} from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

type QueryControllerConstructor = ExtractConstructor<QueryController>;

/**
 * Get the QueryController constructor.
 *
 * @returns The QueryController constructor.
 *
 * @public
 * @unofficial
 */
export function getQueryControllerConstructor(): QueryControllerConstructor {
  return QueryController as QueryControllerConstructor;
}
