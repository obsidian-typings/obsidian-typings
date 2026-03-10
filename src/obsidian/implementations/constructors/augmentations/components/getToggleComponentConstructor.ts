import {
  ToggleComponent
} from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the ToggleComponent constructor.
 *
 * @returns The ToggleComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getToggleComponentConstructor(): ExtractConstructor<ToggleComponent> {
  return ToggleComponent as ExtractConstructor<ToggleComponent>;
}
