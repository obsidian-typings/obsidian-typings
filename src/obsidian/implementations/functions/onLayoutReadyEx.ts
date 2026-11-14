import type { Workspace } from 'obsidian';

import type { LayoutReadyWorkspace } from '../../internals/workspace/LayoutReadyWorkspace.d.ts';

/**
 * Run the callback once the workspace layout is loaded, passing it the workspace as a {@link LayoutReadyWorkspace}.
 *
 * Like {@link obsidian#Workspace.onLayoutReady}, it runs the callback right away if the layout is already loaded,
 * and queues it otherwise. Obsidian calls an `onLayoutReady` callback with no arguments, so this helper is what
 * hands the callback the narrowed workspace.
 *
 * @param workspace - The workspace.
 * @param callback - The callback to run.
 *
 * @public
 * @unofficial
 */
export function onLayoutReadyEx(workspace: Workspace, callback: (workspace: LayoutReadyWorkspace) => unknown): void {
  workspace.onLayoutReady(() => callback(workspace as LayoutReadyWorkspace));
}
