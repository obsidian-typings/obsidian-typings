import {
  HTMLValue
} from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the HTMLValue constructor.
 *
 * @returns The HTMLValue constructor.
 *
 * @public
 * @unofficial
 */
export function getHTMLValueConstructor(): ExtractConstructor<HTMLValue> {
  return HTMLValue as ExtractConstructor<HTMLValue>;
}
