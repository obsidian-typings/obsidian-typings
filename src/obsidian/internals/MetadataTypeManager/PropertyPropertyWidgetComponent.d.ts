import type { PropertyPropertyWidgetComponentComboBox } from './PropertyPropertyWidgetComponentComboBox.d.ts';
import type { PropertyWidgetComponentBase } from './PropertyWidgetComponentBase.d.ts';

/**
 * Property widget component for properties.
 *
 * @public
 * @unofficial
 */
export interface PropertyPropertyWidgetComponent extends PropertyWidgetComponentBase<string> {
    /** The combobox component for the property widget. */
    combobox: PropertyPropertyWidgetComponentComboBox;

    /** The input element for the property widget. */
    inputEl: HTMLInputElement;

    /** The type of the property widget. */
    type: 'property';
}
