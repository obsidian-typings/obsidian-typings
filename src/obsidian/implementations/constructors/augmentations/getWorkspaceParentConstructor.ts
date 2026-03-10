import {
  WorkspaceParent
} from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the WorkspaceParent constructor.
 *
 * @returns The WorkspaceParent constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceParentConstructor(): ExtractConstructor<WorkspaceParent> {
  return WorkspaceParent as unknown as ExtractConstructor<WorkspaceParent>;
}
