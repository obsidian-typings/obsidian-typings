import {
    WorkspaceWindow
} from 'obsidian';
import type { WorkspaceWindowConstructor } from '../../../internals/constructors/augmentations/WorkspaceWindowConstructor.ts';

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
