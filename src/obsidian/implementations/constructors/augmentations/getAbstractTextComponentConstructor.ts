import {
  AbstractTextComponent
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type AbstractTextComponentConstructor = ExtractConstructor<
  AbstractTextComponent<HTMLInputElement | HTMLTextAreaElement>
>;

/**
 * Get the AbstractTextComponent constructor.
 *
 * @returns The AbstractTextComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getAbstractTextComponentConstructor(): AbstractTextComponentConstructor {
  return AbstractTextComponent as AbstractTextComponentConstructor;
}
