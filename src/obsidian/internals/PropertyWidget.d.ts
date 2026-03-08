import type { PropertyWidgetComponentBase } from './metadata-type-manager/PropertyWidgetComponentBase.d.ts';
import type { PropertyRenderContext } from './PropertyRenderContext.d.ts';

/**
 * Property widget.
 *
 * @typeParam ComponentType - The type of the component.
 * @public
 * @unofficial
 */
export interface PropertyWidget<ComponentType extends PropertyWidgetComponentBase = PropertyWidgetComponentBase> {
    /**
     * Lucide-dev icon associated with the widget.
     */
    icon: string;

    /**
     * Reserved keys for the widget.
     */
    reservedKeys?: string[];

    /**
     * Identifier for the widget.
     */
    type: string;

    /**
     * Returns the I18N name of the widget.
     *
     * @returns The localized name of the widget.
     */
    name(): string;

    /**
     * Render function for the widget on field container given context and data.
     *
     * @param containerEl - The container element to render the widget into.
     * @param data - The property data to render.
     * @param context - The rendering context for the property.
     * @returns The rendered widget component.
     */
    render(containerEl: HTMLElement, data: unknown, context: PropertyRenderContext): ComponentType;

    /**
     * Validate whether the input value to the widget is correct.
     *
     * @param value - The value to validate.
     * @returns Whether the value is valid.
     */
    validate(value: unknown): boolean;
}
