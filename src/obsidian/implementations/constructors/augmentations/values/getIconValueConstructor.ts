import {
  IconValue
} from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

type IconValueConstructor = ExtractConstructor<IconValue>;

/**
 * Get the IconValue constructor.
 *
 * @returns The IconValue constructor.
 *
 * @public
 * @unofficial
 */
export function getIconValueConstructor(): IconValueConstructor {
  return IconValue as IconValueConstructor;
}
