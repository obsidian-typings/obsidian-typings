import {
    Modal
} from 'obsidian';
import type { ModalConstructor } from '../../../internals/constructors/augmentations/ModalConstructor.d.ts';

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
