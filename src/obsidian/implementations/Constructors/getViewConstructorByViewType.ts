import type { App } from 'obsidian';
import type { ViewTypeType } from '../../internals/Views/ViewTypeType.d.ts';
import type { ViewTypeViewConstructorMapping } from '../../internals/Views/ViewTypeViewConstructorMapping.d.ts';

/**
 * Get the view constructor by view type.
 *
 * @param app - The app.
 * @param viewType - The view type.
 * @returns The view constructor.
 * @public
 */
export function getViewConstructorByViewType<TViewType extends ViewTypeType>(
    app: App,
    viewType: TViewType
): ViewTypeViewConstructorMapping[TViewType] {
    const leaf = app.workspace.createLeafInTabGroup();
    try {
        const viewCreator = app.viewRegistry.getViewCreatorByType(viewType);
        if (!viewCreator) {
            throw new Error('View creator not found');
        }
        const view = viewCreator(leaf);
        return view.constructor as ViewTypeViewConstructorMapping[TViewType];
    } finally {
        leaf.detach();
    }
}
