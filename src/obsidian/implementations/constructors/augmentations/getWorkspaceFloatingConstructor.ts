import {
    WorkspaceFloating
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the WorkspaceFloating constructor.
 *
 * @returns The WorkspaceFloating constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceFloatingConstructor(): ExtractConstructor<WorkspaceFloating> {
    return WorkspaceFloating as ExtractConstructor<WorkspaceFloating>;
}
