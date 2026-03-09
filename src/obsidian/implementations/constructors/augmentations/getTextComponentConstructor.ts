import {
  TextComponent
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type TextComponentConstructor = ExtractConstructor<TextComponent>;

/**
 * Get the TextComponent constructor.
 *
 * @returns The TextComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getTextComponentConstructor(): TextComponentConstructor {
  return TextComponent as TextComponentConstructor;
}
