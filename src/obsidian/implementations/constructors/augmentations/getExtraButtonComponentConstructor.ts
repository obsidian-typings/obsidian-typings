import {
    ExtraButtonComponent
} from 'obsidian';
import type { ExtraButtonComponentConstructor } from '../../../internals/constructors/augmentations/ExtraButtonComponentConstructor.d.ts';

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
