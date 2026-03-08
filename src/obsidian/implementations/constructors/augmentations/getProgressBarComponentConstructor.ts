import {
    ProgressBarComponent
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type ProgressBarComponentConstructor = ExtractConstructor<ProgressBarComponent>;

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
