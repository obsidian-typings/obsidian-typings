import {
    TextAreaComponent
} from 'obsidian';
import type { TextAreaComponentConstructor } from '../../../internals/Constructors/augmentations/TextAreaComponentConstructor.ts';

/**
 * Get the TextAreaComponent constructor.
 *
 * @returns The TextAreaComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getTextAreaComponentConstructor(): TextAreaComponentConstructor {
    return TextAreaComponent as TextAreaComponentConstructor;
}
