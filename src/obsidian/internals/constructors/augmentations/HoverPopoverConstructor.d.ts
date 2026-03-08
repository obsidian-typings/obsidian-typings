import type {
    HoverParent,
    HoverPopover,
    Point
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The HoverPopover constructor.
 *
 * @public
 * @unofficial
 */
export interface HoverPopoverConstructor extends ConstructorBase<[parent: HoverParent, targetEl: HTMLElement | null, waitTime?: number, staticPos?: Point | null], HoverPopover> {}
