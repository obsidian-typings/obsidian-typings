import {
  ToggleComponent
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type ToggleComponentConstructor = ExtractConstructor<ToggleComponent>;

/**
 * Get the ToggleComponent constructor.
 *
 * @returns The ToggleComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getToggleComponentConstructor(): ToggleComponentConstructor {
  return ToggleComponent as ToggleComponentConstructor;
}
