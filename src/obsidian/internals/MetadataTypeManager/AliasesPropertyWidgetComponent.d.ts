import type { PropertyRenderContext } from '../PropertyRenderContext.d.ts';
import type { Multiselect } from './Multiselect.d.ts';
import type { PropertyWidgetComponentBase } from './PropertyWidgetComponentBase.d.ts';

/**
 * Property widget component for aliases.
 *
 * @public
 * @unofficial
 */
export interface AliasesPropertyWidgetComponent extends PropertyWidgetComponentBase {
    /** The container element for the property widget. */
    containerEl: HTMLElement;

    /** The render context for the property widget. */
    ctx: PropertyRenderContext;

    /** The hover popover for the property widget. */
    hoverPopover: null;

    /** The multiselect component for the property widget. */
    multiselect: Multiselect;

    /** The type of the property widget. */
    type: 'aliases';

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
