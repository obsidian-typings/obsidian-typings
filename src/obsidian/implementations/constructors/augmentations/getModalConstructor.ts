import {
  Modal
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type ModalConstructor = ExtractConstructor<Modal>;

/**
 * Get the Modal constructor.
 *
 * @returns The Modal constructor.
 *
 * @public
 * @unofficial
 */
export function getModalConstructor(): ModalConstructor {
  return Modal as ModalConstructor;
}
