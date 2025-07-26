import type { Component } from 'obsidian';
import type { PropertyRenderContext } from './PropertyRenderContext.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface PropertyWidget {
    /**
     * Lucide-dev icon associated with the widget.
     */
    icon: string;

    /**
     * Returns the I18N name of the widget.
     */
    name: string;

    /**
     * Reserved keys for the widget.
     */
    reservedKeys?: string[];

    /**
     * Identifier for the widget.
     */
    type: string;

    /**
     * Render function for the widget on field container given context and data.
     */
    render(containerEl: HTMLElement, value: unknown, context: PropertyRenderContext): Component | void;

    /**
     * Validate whether the input value to the widget is correct.
     */
    validate(value: unknown): boolean;
}
