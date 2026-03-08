import {
    MomentFormatComponent
} from 'obsidian';
import type { MomentFormatComponentConstructor } from '../../../internals/constructors/augmentations/MomentFormatComponentConstructor.ts';

/**
 * Get the MomentFormatComponent constructor.
 *
 * @returns The MomentFormatComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getMomentFormatComponentConstructor(): MomentFormatComponentConstructor {
    return MomentFormatComponent as MomentFormatComponentConstructor;
}
