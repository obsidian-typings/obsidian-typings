import type { PropertyWidgetComponentBase } from './PropertyWidgetComponentBase.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface DatetimePropertyWidgetComponent extends PropertyWidgetComponentBase {
    /** @todo Documentation incomplete. */
    inputEl: HTMLInputElement;

    /** @todo Documentation incomplete. */
    type: 'datetime';

    /** @todo Documentation incomplete. */
    parseDateTime(input: moment.MomentInput): string;

    /** @todo Documentation incomplete. */
    setValue(value: string | null): void;
}
