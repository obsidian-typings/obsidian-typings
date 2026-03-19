import { WorkspaceRoot } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the WorkspaceRoot constructor.
 *
 * @returns The WorkspaceRoot constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceRootConstructor(): ExtractConstructor<WorkspaceRoot> {
  return WorkspaceRoot as ExtractConstructor<WorkspaceRoot>;
}
