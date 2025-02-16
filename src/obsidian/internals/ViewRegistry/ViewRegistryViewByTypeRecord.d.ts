import type {
    ViewCreator
} from 'obsidian';
import type { TypedViewCreator } from '../Views/TypedViewCreator.d.ts';
import type { ViewTypeType } from '../Views/ViewTypeType.d.ts';
import type { ViewTypeViewMapping } from '../Views/ViewTypeViewMapping.d.ts';

/** @public */
type Mapping = {
    [TViewType in ViewTypeType]: TypedViewCreator<ViewTypeViewMapping[TViewType]>;
};
/** @public */
export interface ViewRegistryViewByTypeRecord extends Record<string, ViewCreator>, Mapping {
}
