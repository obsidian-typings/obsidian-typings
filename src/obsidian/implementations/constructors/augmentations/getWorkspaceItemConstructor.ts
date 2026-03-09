import {
    WorkspaceItem
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the WorkspaceItem constructor.
 *
 * @returns The WorkspaceItem constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceItemConstructor(): ExtractConstructor<WorkspaceItem> {
    return WorkspaceItem as unknown as ExtractConstructor<WorkspaceItem>;
}
