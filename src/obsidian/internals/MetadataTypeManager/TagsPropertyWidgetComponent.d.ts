import type { Multiselect } from './Multiselect.d.ts';
import type { PropertyWidgetComponentBase } from './PropertyWidgetComponentBase.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface TagsPropertyWidgetComponent extends PropertyWidgetComponentBase {
    /**
     * @todo Documentation incomplete.
     */
    multiselect: Multiselect;

    /**
     * @todo Documentation incomplete.
     */
    type: 'tags';

    /**
     * @todo Documentation incomplete.
     */
    setValue(value: string[] | string): void;
}
