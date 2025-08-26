import type { PropertyWidgetComponentBase } from './MetadataTypeManager/PropertyWidgetComponentBase.d.ts';
import type { PropertyRenderContext } from './PropertyRenderContext.d.ts';

/**
 * Property widget.
 *
 * @public
 * @unofficial
 */
export interface PropertyWidget<
    Value = unknown,
    ComponentType extends PropertyWidgetComponentBase<Value> = PropertyWidgetComponentBase<Value>
> {
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
     */
    name(): string;

    /**
     * Render function for the widget on field container given context and data.
     */
    render(containerEl: HTMLElement, data: Value | null, context: PropertyRenderContext): ComponentType;

    /**
     * Validate whether the input value to the widget is correct.
     */
    validate(value: unknown): boolean;
}
