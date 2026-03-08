import {
    QueryController
} from 'obsidian';
import type { QueryControllerConstructor } from '../../../internals/Constructors/augmentations/QueryControllerConstructor.ts';

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
