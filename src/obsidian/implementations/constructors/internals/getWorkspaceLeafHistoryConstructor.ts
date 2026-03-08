import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';
import type { WorkspaceLeafHistory } from '../../../internals/workspace-leaf-history/WorkspaceLeafHistory.d.ts';

/**
 * Get the WorkspaceLeafHistory constructor.
 *
 * @param app - The app instance.
 * @returns The WorkspaceLeafHistory constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceLeafHistoryConstructor(app: App): ExtractConstructor<WorkspaceLeafHistory> {
    const leaf = app.workspace.getMostRecentLeaf();
    if (!leaf) {
        throw new Error('No workspace leaf available to extract WorkspaceLeafHistory constructor');
    }
    return leaf.history.constructor as ExtractConstructor<WorkspaceLeafHistory>;
}
