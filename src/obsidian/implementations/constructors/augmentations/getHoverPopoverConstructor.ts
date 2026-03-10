import {
  HoverPopover
} from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the HoverPopover constructor.
 *
 * @returns The HoverPopover constructor.
 *
 * @public
 * @unofficial
 */
export function getHoverPopoverConstructor(): ExtractConstructor<HoverPopover> {
  return HoverPopover as ExtractConstructor<HoverPopover>;
}
