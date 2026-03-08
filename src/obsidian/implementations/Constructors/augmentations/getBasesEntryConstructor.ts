import {
    BasesEntry
} from 'obsidian';
import type { BasesEntryConstructor } from '../../../internals/Constructors/augmentations/BasesEntryConstructor.ts';

/**
 * Get the BasesEntry constructor.
 *
 * @returns The BasesEntry constructor.
 *
 * @public
 * @unofficial
 */
export function getBasesEntryConstructor(): BasesEntryConstructor {
    return BasesEntry as BasesEntryConstructor;
}
