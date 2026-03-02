import type {
    ViewCreator
} from 'obsidian';
import type { TypedViewCreator } from '../Views/TypedViewCreator.d.ts';
import type { ViewTypeType } from '../Views/ViewTypeType.d.ts';
import type { ViewTypeViewMapping } from '../Views/ViewTypeViewMapping.d.ts';

/**
 * Internal mapping of view types to their typed view creator functions.
 *
 * @public
 * @unofficial
 */
type Mapping = {
    [TViewType in ViewTypeType]: TypedViewCreator<ViewTypeViewMapping[TViewType]>;
};
/**
 * Record mapping view type strings to their corresponding view creator functions.
 * @public
 * @unofficial
 */
export interface ViewRegistryViewByTypeRecord extends Record<string, ViewCreator>, Mapping {
}
