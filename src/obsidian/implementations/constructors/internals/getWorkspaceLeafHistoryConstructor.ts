import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';
import type { WorkspaceLeafHistory } from '../../../internals/workspace-leaf-history/WorkspaceLeafHistory.d.ts';

type WorkspaceLeafHistoryConstructor = ExtractConstructor<WorkspaceLeafHistory>;

/**
 * Get the WorkspaceLeafHistory constructor.
 *
 * @param app - The app instance.
 * @returns The WorkspaceLeafHistory constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceLeafHistoryConstructor(app: App): WorkspaceLeafHistoryConstructor {
    const leaf = app.workspace.getMostRecentLeaf();
    if (!leaf) {
        throw new Error('No workspace leaf available to extract WorkspaceLeafHistory constructor');
    }
    return leaf.history.constructor as WorkspaceLeafHistoryConstructor;
}
