import {
  ButtonComponent
} from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

type ButtonComponentConstructor = ExtractConstructor<ButtonComponent>;

/**
 * Get the ButtonComponent constructor.
 *
 * @returns The ButtonComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getButtonComponentConstructor(): ButtonComponentConstructor {
  return ButtonComponent as ButtonComponentConstructor;
}
