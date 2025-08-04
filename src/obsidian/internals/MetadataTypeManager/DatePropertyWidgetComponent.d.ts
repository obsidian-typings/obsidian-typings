import type { PropertyWidgetComponentBase } from './PropertyWidgetComponentBase.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface DatePropertyWidgetComponent extends PropertyWidgetComponentBase {
    /** @todo Documentation incomplete. */
    inputEl: HTMLInputElement;

    /** @todo Documentation incomplete. */
    type: 'date';

    /** @todo Documentation incomplete. */
    parseDate(input: moment.MomentInput): string;

    /** @todo Documentation incomplete. */
    setValue(value: string | null): void;
}
