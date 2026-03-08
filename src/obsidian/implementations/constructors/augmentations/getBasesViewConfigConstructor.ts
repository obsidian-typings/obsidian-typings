import {
    BasesViewConfig
} from 'obsidian';
import type { BasesViewConfigConstructor } from '../../../internals/constructors/augmentations/BasesViewConfigConstructor.ts';

/**
 * Get the BasesViewConfig constructor.
 *
 * @returns The BasesViewConfig constructor.
 *
 * @public
 * @unofficial
 */
export function getBasesViewConfigConstructor(): BasesViewConfigConstructor {
    return BasesViewConfig as BasesViewConfigConstructor;
}
