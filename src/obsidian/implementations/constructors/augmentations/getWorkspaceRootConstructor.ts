import { WorkspaceRoot } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#WorkspaceRoot} constructor.
 *
 * @returns The {@link obsidian#WorkspaceRoot} constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceRootConstructor(): ExtractConstructor<WorkspaceRoot> {
  return WorkspaceRoot as ExtractConstructor<WorkspaceRoot>;
}
