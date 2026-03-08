import {
    TextAreaComponent
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type TextAreaComponentConstructor = ExtractConstructor<TextAreaComponent>;

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
