import type { PropertyWidgetComponentBase } from './PropertyWidgetComponentBase.d.ts';

/**
 * Property widget component for checkboxes.
 *
 * @public
 * @unofficial
 */
export interface CheckboxPropertyWidgetComponent extends PropertyWidgetComponentBase {
    /** The checkbox element for the property widget. */
    checkboxEl: HTMLInputElement;

    /** The type of the property widget. */
    type: 'checkbox';

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
