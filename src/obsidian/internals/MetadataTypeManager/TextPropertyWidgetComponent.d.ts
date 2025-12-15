import type { PropertyRenderContext } from '../PropertyRenderContext.d.ts';
import type { PropertyWidgetComponentBase } from './PropertyWidgetComponentBase.d.ts';

/**
 * Property widget component for text.
 *
 * @public
 * @unofficial
 */
export interface TextPropertyWidgetComponent extends PropertyWidgetComponentBase {
    /** The container element for the property widget. */
    containerEl: HTMLElement;

    /** The render context for the property widget. */
    ctx: PropertyRenderContext;

    /** The input element for the property widget. */
    inputEl: HTMLInputElement;

    /** The hover popover for the property widget. */
    hoverPopover: null;

    /** The type of the property widget. */
    type: 'text';

    /** The value of the property widget. */
    value: string;

    /**
     * Render the property widget.
     */
    render(): void;

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
