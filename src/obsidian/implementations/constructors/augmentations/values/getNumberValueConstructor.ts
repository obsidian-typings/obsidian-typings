import {
  NumberValue
} from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

type NumberValueConstructor = ExtractConstructor<NumberValue>;

/**
 * Get the NumberValue constructor.
 *
 * @returns The NumberValue constructor.
 *
 * @public
 * @unofficial
 */
export function getNumberValueConstructor(): NumberValueConstructor {
  return NumberValue as NumberValueConstructor;
}
