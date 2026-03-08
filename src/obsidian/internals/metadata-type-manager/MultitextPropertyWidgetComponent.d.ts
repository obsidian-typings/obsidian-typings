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
    hoverPopover: null;

    /** The multiselect component for the property widget. */
    multiselect: Multiselect;

    /** The type of the property widget. */
    type: 'multitext';

    /** The values of the property widget. */
    valueSet: Set<string>;

    /**
     * Handle focus event.
     *
     * @param mode - The focus mode.
     */
    onFocus(): void;

    /**
     * Set the value of the property widget.
     *
     * @param value - The value to set.
     */
    setValue(value: unknown): void;
}
