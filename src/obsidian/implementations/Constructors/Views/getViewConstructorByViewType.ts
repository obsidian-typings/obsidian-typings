import type {
    App,
    Constructor,
    View
} from 'obsidian';

/**
 * Get the view constructor by view type.
 *
 * @param app - The app.
 * @param viewType - The view type.
 * @returns The view constructor.
 * @public
 */
export function getViewConstructorByViewType<TView extends View = View>(app: App, viewType: string): Constructor<TView> {
    const leaf = app.workspace.createLeafInTabGroup();
    try {
        const viewCreator = app.viewRegistry.getViewCreatorByType(viewType);
        if (!viewCreator) {
            throw new Error('View creator not found');
        }
        const view = viewCreator(leaf);
        return view.constructor as Constructor<TView>;
    } finally {
        leaf.detach();
    }
}
