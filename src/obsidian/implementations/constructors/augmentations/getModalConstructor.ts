import {
  Modal
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the Modal constructor.
 *
 * @returns The Modal constructor.
 *
 * @public
 * @unofficial
 */
export function getModalConstructor(): ExtractConstructor<Modal> {
  return Modal as ExtractConstructor<Modal>;
}
