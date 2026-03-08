import {
    QueryController
} from 'obsidian';
import type { QueryControllerConstructor } from '../../../internals/constructors/augmentations/QueryControllerConstructor.ts';

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
