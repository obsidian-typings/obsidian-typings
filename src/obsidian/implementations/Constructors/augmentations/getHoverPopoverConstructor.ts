import {
    HoverPopover
} from 'obsidian';
import type { HoverPopoverConstructor } from '../../../internals/Constructors/augmentations/HoverPopoverConstructor.ts';

/**
 * Get the HoverPopover constructor.
 *
 * @returns The HoverPopover constructor.
 *
 * @public
 * @unofficial
 */
export function getHoverPopoverConstructor(): HoverPopoverConstructor {
    return HoverPopover as HoverPopoverConstructor;
}
