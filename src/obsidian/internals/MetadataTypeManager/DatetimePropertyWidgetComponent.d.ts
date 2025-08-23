import type { DatePropertyWidgetComponentBase } from './DatePropertyWidgetComponentBase.d.ts';

/**
 * Property widget component for datetimes.
 *
 * @public
 * @unofficial
 */
export interface DatetimePropertyWidgetComponent extends DatePropertyWidgetComponentBase {
    /** The type of the property widget. */
    type: 'datetime';
}
