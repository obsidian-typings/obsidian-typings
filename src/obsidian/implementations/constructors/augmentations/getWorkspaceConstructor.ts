import {
    Workspace
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type WorkspaceConstructor = ExtractConstructor<Workspace>;

/**
 * Get the Workspace constructor.
 *
 * @returns The Workspace constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceConstructor(): WorkspaceConstructor {
    return Workspace as WorkspaceConstructor;
}
