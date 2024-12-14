import type {
    ViewCreator
} from 'obsidian';
import type { TypedViewCreator } from '../Views/TypedViewCreator.js';
import type { ViewTypeViewMapping } from '../Views/ViewTypeViewMapping.js';
import type { ViewTypeType } from '../Views/ViewTypeType.js';

/** @public */
export interface ViewRegistryViewByTypeRecord extends Record<string, ViewCreator>, Mapping {
}

/** @public */
type Mapping = {
    [TViewType in ViewTypeType]: TypedViewCreator<ViewTypeViewMapping[TViewType]>
};
