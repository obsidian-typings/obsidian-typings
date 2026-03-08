import {
    ButtonComponent
} from 'obsidian';
import type { ButtonComponentConstructor } from '../../../internals/constructors/augmentations/ButtonComponentConstructor.ts';

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
