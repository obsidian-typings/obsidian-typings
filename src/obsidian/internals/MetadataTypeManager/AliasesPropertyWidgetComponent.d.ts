import type { HoverPopover } from 'obsidian';
import type { PropertyRenderContext } from '../PropertyRenderContext.d.ts';
import type { Multiselect } from './Multiselect.d.ts';
import type { PropertyWidgetComponentBase } from './PropertyWidgetComponentBase.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface AliasesPropertyWidgetComponent extends PropertyWidgetComponentBase {
    /** @todo Documentation incomplete. */
    ctx: PropertyRenderContext;

    /** @todo Documentation incomplete. */
    hoverPopover: HoverPopover | null;

    /** @todo Documentation incomplete. */
    multiselect: Multiselect;

    /** @todo Documentation incomplete. */
    type: 'aliases';

    /** @todo Documentation incomplete. */
    setValue(value: string | string[]): void;
}
