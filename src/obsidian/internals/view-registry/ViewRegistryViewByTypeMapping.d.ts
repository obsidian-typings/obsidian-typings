import type { TypedViewCreator } from '../views/TypedViewCreator.d.ts';
import type { ViewTypeType } from '../views/ViewTypeType.d.ts';
import type { ViewTypeViewMapping } from '../views/ViewTypeViewMapping.d.ts';

/**
 * Internal mapping of view types to their typed view creator functions.
 *
 * @public
 * @unofficial
 */
export type ViewRegistryViewByTypeMapping = {
  [TViewType in ViewTypeType]: TypedViewCreator<ViewTypeViewMapping[TViewType]>;
};
