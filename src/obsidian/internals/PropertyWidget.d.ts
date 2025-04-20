import type { Component } from 'obsidian';
import type { PropertyEntryData } from './PropertyEntryData.d.ts';
import type { PropertyRenderContext } from './PropertyRenderContext.d.ts';

/**
 * @public
 * @unofficial
 */
export interface PropertyWidget<T> {
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
     * Get the default value for the property widget.
     */
    default(): T;
    /**
     * Returns the I18N name of the widget.
     */
    name(): string;
    /**
     * Render function for the widget on field container given context and data.
     */
    render(containerEl: HTMLElement, data: PropertyEntryData<T>, context: PropertyRenderContext): Component | void;
    /**
     * Validate whether the input value to the widget is correct.
     */
    validate(value: T): boolean;
}
