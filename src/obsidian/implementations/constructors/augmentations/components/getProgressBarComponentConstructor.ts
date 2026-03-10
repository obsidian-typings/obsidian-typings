import {
  ProgressBarComponent
} from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the ProgressBarComponent constructor.
 *
 * @returns The ProgressBarComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getProgressBarComponentConstructor(): ExtractConstructor<ProgressBarComponent> {
  return ProgressBarComponent as ExtractConstructor<ProgressBarComponent>;
}
