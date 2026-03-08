import {
    BasesEntryGroup
} from 'obsidian';
import type { BasesEntryGroupConstructor } from '../../../internals/constructors/augmentations/BasesEntryGroupConstructor.ts';

/**
 * Get the BasesEntryGroup constructor.
 *
 * @returns The BasesEntryGroup constructor.
 *
 * @public
 * @unofficial
 */
export function getBasesEntryGroupConstructor(): BasesEntryGroupConstructor {
    return BasesEntryGroup as BasesEntryGroupConstructor;
}
