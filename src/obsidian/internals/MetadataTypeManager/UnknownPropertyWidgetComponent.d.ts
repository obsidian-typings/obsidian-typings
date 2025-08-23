import type { PropertyWidgetComponentBase } from './PropertyWidgetComponentBase.d.ts';

/**
 * Property widget component for unknown types.
 *
 * @public
 * @unofficial
 */
export interface UnknownPropertyWidgetComponent extends PropertyWidgetComponentBase<unknown> {
    /** The element of the property widget. */
    el: HTMLSpanElement;

    /** The type of the property widget. */
    type: 'unknown';
}
