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
 */
export function getViewConstructorByViewType(app: App, viewType: string): Constructor<View> {
    const leaf = app.workspace.createLeafInTabGroup();
    try {
        const viewCreator = app.viewRegistry.getViewCreatorByType(viewType);
        if (!viewCreator) {
            throw new Error('View creator not found');
        }
        const view = viewCreator(leaf);
        return view.constructor as Constructor<View>;
    } finally {
        leaf.detach();
    }
}
