import {
  ObjectValue
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type ObjectValueConstructor = ExtractConstructor<ObjectValue>;

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
