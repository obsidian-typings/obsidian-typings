import {
  WorkspaceLeaf
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type WorkspaceLeafConstructor = ExtractConstructor<WorkspaceLeaf>;

/**
 * Get the WorkspaceLeaf constructor.
 *
 * @returns The WorkspaceLeaf constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceLeafConstructor(): WorkspaceLeafConstructor {
  return WorkspaceLeaf as WorkspaceLeafConstructor;
}
