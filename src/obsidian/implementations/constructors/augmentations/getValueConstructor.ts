import {
  Value
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the Value constructor.
 *
 * @returns The Value constructor.
 *
 * @public
 * @unofficial
 */
export function getValueConstructor(): ExtractConstructor<Value> {
  return Value as unknown as ExtractConstructor<Value>;
}
