import type {
    ViewCreator
} from 'obsidian';
import type { TypedViewCreator } from '../Views/TypedViewCreator.js';
import type { ViewTypeType } from '../Views/ViewTypeType.js';
import type { ViewTypeViewMapping } from '../Views/ViewTypeViewMapping.js';

/** @public */
type Mapping = {
    [TViewType in ViewTypeType]: TypedViewCreator<ViewTypeViewMapping[TViewType]>;
};
/** @public */
export interface ViewRegistryViewByTypeRecord extends Record<string, ViewCreator>, Mapping {
}
