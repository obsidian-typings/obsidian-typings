import type { FocusMode } from '../FocusMode.d.ts';

/**
 * Base class for property widget components.
 *
 * @public
 * @unofficial
 */
export interface PropertyWidgetComponentBase<Value = unknown> {
    /** The container element for the property widget. */
    containerEl: HTMLElement;

    /** The type of the property widget. */
    type: string;

    /**
     * Focus the property widget.
     *
     * @param mode - The focus mode.
     */
    focus(mode?: FocusMode): void;

    /**
     * Handle focus event.
     *
     * @param mode - The focus mode.
     */
    onFocus(mode: FocusMode): void;

    /**
     * Set the value of the property widget.
     *
     * @param value - The value to set.
     */
    setValue(value: Value | null): void;
}
