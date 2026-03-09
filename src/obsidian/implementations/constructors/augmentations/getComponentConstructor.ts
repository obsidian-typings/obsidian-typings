import {
  Component
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the Component constructor.
 *
 * @returns The Component constructor.
 *
 * @public
 * @unofficial
 */
export function getComponentConstructor(): ExtractConstructor<Component> {
  return Component as ExtractConstructor<Component>;
}
