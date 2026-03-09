import {
  WorkspaceWindow
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type WorkspaceWindowConstructor = ExtractConstructor<WorkspaceWindow>;

/**
 * Get the WorkspaceWindow constructor.
 *
 * @returns The WorkspaceWindow constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceWindowConstructor(): WorkspaceWindowConstructor {
  return WorkspaceWindow as WorkspaceWindowConstructor;
}
