import {
    ExtraButtonComponent
} from 'obsidian';
import type { ExtraButtonComponentConstructor } from '../../../internals/Constructors/augmentations/ExtraButtonComponentConstructor.ts';

/**
 * Get the ExtraButtonComponent constructor.
 *
 * @returns The ExtraButtonComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getExtraButtonComponentConstructor(): ExtraButtonComponentConstructor {
    return ExtraButtonComponent as ExtraButtonComponentConstructor;
}
