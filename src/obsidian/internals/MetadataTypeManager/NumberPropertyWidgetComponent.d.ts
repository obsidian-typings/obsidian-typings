import type { PropertyWidgetComponentBase } from './PropertyWidgetComponentBase.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface NumberPropertyWidgetComponent extends PropertyWidgetComponentBase {
    /**
     * @todo Documentation incomplete.
     */
    inputEl: HTMLInputElement;

    /**
     * @todo Documentation incomplete.
     */
    type: 'number';

    /**
     * @todo Documentation incomplete.
     */
    setValue(value: number | null): void;
}
