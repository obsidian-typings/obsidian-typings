import {
    ObjectValue
} from 'obsidian';
import type { ObjectValueConstructor } from '../../../internals/constructors/augmentations/ObjectValueConstructor.d.ts';

/**
 * Get the ObjectValue constructor.
 *
 * @returns The ObjectValue constructor.
 *
 * @public
 * @unofficial
 */
export function getObjectValueConstructor(): ObjectValueConstructor {
    return ObjectValue as ObjectValueConstructor;
}
