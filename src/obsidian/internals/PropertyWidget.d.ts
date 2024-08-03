import type { Component } from "obsidian";
import type { PropertyEntryData } from "./PropertyEntryData.js";
import type { PropertyRenderContext } from "./PropertyRenderContext.js";

export interface PropertyWidget<T> {
    /**
     * Lucide-dev icon associated with the widget
     */
    icon: string;
    /**
     * Returns the I18N name of the widget
     */
    name: () => string;
    /**
     * Reserved keys for the widget
     */
    reservedKeys?: string[];
    /**
     * Identifier for the widget
     */
    type: string;

    /**
     * Get the default value for the property widget
     */
    default(): T;
    /**
     * Render function for the widget on field container given context and data
     */
    render(containerEl: HTMLElement, data: PropertyEntryData<T>, context: PropertyRenderContext): Component | void;
    /**
     * Validate whether the input value to the widget is correct
     */
    validate(value: T): boolean;
}
