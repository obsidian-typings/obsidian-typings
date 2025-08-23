import type { PropertyWidgetComponentBase } from './PropertyWidgetComponentBase.d.ts';

/**
 * Property widget component for checkboxes.
 *
 * @public
 * @unofficial
 */
export interface CheckboxPropertyWidgetComponent extends PropertyWidgetComponentBase<boolean> {
    /** The checkbox element for the property widget. */
    checkboxEl: HTMLInputElement;

    /** The type of the property widget. */
    type: 'checkbox';
}
