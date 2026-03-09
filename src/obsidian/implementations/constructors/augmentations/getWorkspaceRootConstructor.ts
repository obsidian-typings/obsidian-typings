import {
  WorkspaceRoot
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type WorkspaceRootConstructor = ExtractConstructor<WorkspaceRoot>;

/**
 * Get the WorkspaceRoot constructor.
 *
 * @returns The WorkspaceRoot constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceRootConstructor(): WorkspaceRootConstructor {
  return WorkspaceRoot as WorkspaceRootConstructor;
}
