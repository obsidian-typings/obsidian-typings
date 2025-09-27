import type { PropertyWidgetComponentBase } from './PropertyWidgetComponentBase.d.ts';

/**
 * Property widget component for numbers.
 *
 * @public
 * @unofficial
 */
export interface NumberPropertyWidgetComponent extends PropertyWidgetComponentBase {
    /** The input element for the property widget. */
    inputEl: HTMLInputElement;

    /** The type of the property widget. */
    type: 'number';

    /** Show the error message. */
    showError(): void;
}
