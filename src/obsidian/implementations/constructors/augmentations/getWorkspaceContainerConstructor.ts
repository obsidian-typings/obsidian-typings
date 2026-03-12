import { WorkspaceContainer } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the WorkspaceContainer constructor.
 *
 * @returns The WorkspaceContainer constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceContainerConstructor(): ExtractConstructor<WorkspaceContainer> {
  return WorkspaceContainer as unknown as ExtractConstructor<WorkspaceContainer>;
}
