import type { Workspace } from 'obsidian';

import type { LayoutReadyWorkspace } from '../../internals/workspace/LayoutReadyWorkspace.d.ts';

/**
 * Check if the workspace layout is loaded, narrowing the workspace to {@link LayoutReadyWorkspace}.
 *
 * @param workspace - The workspace to check.
 * @returns Whether the workspace layout is loaded.
 *
 * @public
 * @unofficial
 */
export function isLayoutReady(workspace: Workspace): workspace is LayoutReadyWorkspace {
  return workspace.layoutReady;
}
