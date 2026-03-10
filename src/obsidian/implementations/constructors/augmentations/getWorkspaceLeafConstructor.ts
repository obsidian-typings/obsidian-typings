import {
  WorkspaceLeaf
} from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the WorkspaceLeaf constructor.
 *
 * @returns The WorkspaceLeaf constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceLeafConstructor(): ExtractConstructor<WorkspaceLeaf> {
  return WorkspaceLeaf as ExtractConstructor<WorkspaceLeaf>;
}
