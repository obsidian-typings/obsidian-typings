import type { PropertyPropertyWidgetComponentComboBox } from './PropertyPropertyWidgetComponentComboBox.d.ts';
import type { PropertyWidgetComponentBase } from './PropertyWidgetComponentBase.d.ts';

/**
 * Property widget component for properties.
 *
 * @public
 * @unofficial
 */
export interface PropertyPropertyWidgetComponent extends PropertyWidgetComponentBase {
    /** The combobox component for the property widget. */
    combobox: PropertyPropertyWidgetComponentComboBox;

    /** The input element for the property widget. */
    inputEl: HTMLInputElement;

    /** The type of the property widget. */
    type: 'property';

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
