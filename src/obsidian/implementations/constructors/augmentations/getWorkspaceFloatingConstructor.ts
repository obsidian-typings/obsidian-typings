import {
  WorkspaceFloating
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type WorkspaceFloatingConstructor = ExtractConstructor<WorkspaceFloating>;

/**
 * Get the WorkspaceFloating constructor.
 *
 * @returns The WorkspaceFloating constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceFloatingConstructor(): WorkspaceFloatingConstructor {
  return WorkspaceFloating as WorkspaceFloatingConstructor;
}
