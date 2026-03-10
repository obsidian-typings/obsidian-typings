import {
  ObjectValue
} from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the ObjectValue constructor.
 *
 * @returns The ObjectValue constructor.
 *
 * @public
 * @unofficial
 */
export function getObjectValueConstructor(): ExtractConstructor<ObjectValue> {
  return ObjectValue as ExtractConstructor<ObjectValue>;
}
