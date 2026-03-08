import type { PropertyWidgetComponentBase } from './PropertyWidgetComponentBase.d.ts';

/**
 * Property widget component for files.
 *
 * @public
 * @unofficial
 */
export interface FilePropertyWidgetComponent extends PropertyWidgetComponentBase {
    /** The input element for the property widget. */
    inputEl: HTMLInputElement;

    /** The type of the property widget. */
    type: 'file';

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
