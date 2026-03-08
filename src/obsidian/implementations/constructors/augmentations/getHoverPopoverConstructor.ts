import {
    HoverPopover
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type HoverPopoverConstructor = ExtractConstructor<HoverPopover>;

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
