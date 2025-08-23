import type { Multiselect } from './Multiselect.d.ts';
import type { PropertyWidgetComponentBase } from './PropertyWidgetComponentBase.d.ts';

/**
 * Property widget component for tags.
 *
 * @public
 * @unofficial
 */
export interface TagsPropertyWidgetComponent extends PropertyWidgetComponentBase<string[] | string> {
    /** The multiselect component for the property widget. */
    multiselect: Multiselect;

    /** The type of the property widget. */
    type: 'tags';
}
