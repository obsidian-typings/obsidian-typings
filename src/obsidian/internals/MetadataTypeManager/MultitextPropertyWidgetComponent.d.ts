import type { HoverPopover } from 'obsidian';
import type { Multiselect } from './Multiselect.d.ts';
import type { PropertyWidgetComponentBase } from './PropertyWidgetComponentBase.d.ts';

/**
 * Property widget component for multiple texts.
 *
 * @public
 * @unofficial
 */
export interface MultitextPropertyWidgetComponent extends PropertyWidgetComponentBase {
    /** The hover popover for the property widget. */
    hoverPopover: HoverPopover | null;

    /** The multiselect component for the property widget. */
    multiselect: Multiselect;

    /** The type of the property widget. */
    type: 'multitext';

    /** The values of the property widget. */
    valueSet: Set<string>;
}
