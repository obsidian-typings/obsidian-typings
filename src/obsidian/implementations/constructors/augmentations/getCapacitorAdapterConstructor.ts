import {
    CapacitorAdapter
} from 'obsidian';
import type { CapacitorAdapterConstructor } from '../../../internals/constructors/augmentations/CapacitorAdapterConstructor.ts';

/**
 * Get the CapacitorAdapter constructor.
 *
 * @returns The CapacitorAdapter constructor.
 *
 * @public
 * @unofficial
 */
export function getCapacitorAdapterConstructor(): CapacitorAdapterConstructor {
    return CapacitorAdapter as CapacitorAdapterConstructor;
}
