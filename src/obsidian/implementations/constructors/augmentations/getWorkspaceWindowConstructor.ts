import {
  WorkspaceWindow
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the WorkspaceWindow constructor.
 *
 * @returns The WorkspaceWindow constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceWindowConstructor(): ExtractConstructor<WorkspaceWindow> {
  return WorkspaceWindow as ExtractConstructor<WorkspaceWindow>;
}
