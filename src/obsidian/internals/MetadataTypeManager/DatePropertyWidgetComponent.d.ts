import type { DatePropertyWidgetComponentBase } from './DatePropertyWidgetComponentBase.d.ts';

/**
 * Property widget component for dates.
 *
 * @public
 * @unofficial
 */
export interface DatePropertyWidgetComponent extends DatePropertyWidgetComponentBase {
    /** The button element for the property widget. */
    buttonEl: HTMLDivElement | null;

    /** The type of the property widget. */
    type: 'date';
}
