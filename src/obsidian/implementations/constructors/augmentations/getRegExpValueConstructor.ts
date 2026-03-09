import {
  RegExpValue
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type RegExpValueConstructor = ExtractConstructor<RegExpValue>;

/**
 * Get the RegExpValue constructor.
 *
 * @returns The RegExpValue constructor.
 *
 * @public
 * @unofficial
 */
export function getRegExpValueConstructor(): RegExpValueConstructor {
  return RegExpValue as RegExpValueConstructor;
}
