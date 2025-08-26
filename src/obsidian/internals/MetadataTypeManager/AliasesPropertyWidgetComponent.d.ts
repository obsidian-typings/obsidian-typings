import type { HoverPopover } from 'obsidian';
import type { PropertyRenderContext } from '../PropertyRenderContext.d.ts';
import type { Multiselect } from './Multiselect.d.ts';
import type { PropertyWidgetComponentBase } from './PropertyWidgetComponentBase.d.ts';

/**
 * Property widget component for aliases.
 *
 * @public
 * @unofficial
 */
export interface AliasesPropertyWidgetComponent extends PropertyWidgetComponentBase {
    /** The render context for the property widget. */
    ctx: PropertyRenderContext;

    /** The hover popover for the property widget. */
    hoverPopover: HoverPopover | null;

    /** The multiselect component for the property widget. */
    multiselect: Multiselect;

    /** The type of the property widget. */
    type: 'aliases';
}
