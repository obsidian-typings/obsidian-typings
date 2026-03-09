import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';
import type { ViewTypeType } from '../../../../internals/views/ViewTypeType.d.d.ts';
import type { ViewTypeViewMapping } from '../../../../internals/views/ViewTypeViewMapping.d.ts';

/**
 * Get the view constructor by view type.
 *
 * @param app - The app.
 * @param viewType - The view type.
 * @returns The view constructor.
 *
 * @public
 * @unofficial
 */
export function getViewConstructorByViewType<TViewType extends ViewTypeType>(
    app: App,
    viewType: TViewType
): ExtractConstructor<ViewTypeViewMapping[TViewType]> {
    const leaf = app.workspace.createLeafInTabGroup();
    try {
        const viewCreator = app.viewRegistry.getViewCreatorByType(viewType);
        if (!viewCreator) {
            throw new Error('View creator not found');
        }
        const view = viewCreator(leaf);
        return view.constructor as ExtractConstructor<ViewTypeViewMapping[TViewType]>;
    } finally {
        leaf.detach();
    }
}
