import {
    TextComponent
} from 'obsidian';
import type { TextComponentConstructor } from '../../../internals/constructors/augmentations/TextComponentConstructor.d.ts';

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
