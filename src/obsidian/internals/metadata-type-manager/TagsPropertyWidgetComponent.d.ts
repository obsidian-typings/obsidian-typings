import type { Multiselect } from './Multiselect.d.ts';
import type { PropertyWidgetComponentBase } from './PropertyWidgetComponentBase.d.ts';

/**
 * Property widget component for tags.
 *
 * @public
 * @unofficial
 */
export interface TagsPropertyWidgetComponent extends PropertyWidgetComponentBase {
    /** The multiselect component for the property widget. */
    multiselect: Multiselect;

    /** The type of the property widget. */
    type: 'tags';

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
