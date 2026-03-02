import type { PropertyWidgetType } from './PropertyWidgetType.d.ts';

/**
 * Entry associating a display name with a property widget type.
 * @public
 * @unofficial
 */
export interface PropertyWidgetEntry {
    /** Display name of the property widget. */
    name: string;

    /** The property widget type. */
    widget: PropertyWidgetType;
}
