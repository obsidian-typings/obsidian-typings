import type { PropertyWidgetComponentBase } from './PropertyWidgetComponentBase.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface CheckboxPropertyWidgetComponent extends PropertyWidgetComponentBase {
    /**
     * @todo Documentation incomplete.
     */
    checkboxEl: HTMLInputElement;

    /**
     * @todo Documentation incomplete.
     */
    type: 'checkbox';

    /**
     * @todo Documentation incomplete.
     */
    setValue(value: boolean | null): void;
}
