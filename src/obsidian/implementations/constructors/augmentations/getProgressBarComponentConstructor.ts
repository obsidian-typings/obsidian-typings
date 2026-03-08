import {
    ProgressBarComponent
} from 'obsidian';
import type { ProgressBarComponentConstructor } from '../../../internals/constructors/augmentations/ProgressBarComponentConstructor.d.ts';

/**
 * Get the ProgressBarComponent constructor.
 *
 * @returns The ProgressBarComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getProgressBarComponentConstructor(): ProgressBarComponentConstructor {
    return ProgressBarComponent as ProgressBarComponentConstructor;
}
