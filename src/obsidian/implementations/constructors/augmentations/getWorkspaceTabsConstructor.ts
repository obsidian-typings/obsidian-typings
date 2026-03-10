import {
  WorkspaceTabs
} from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the WorkspaceTabs constructor.
 *
 * @returns The WorkspaceTabs constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceTabsConstructor(): ExtractConstructor<WorkspaceTabs> {
  return WorkspaceTabs as ExtractConstructor<WorkspaceTabs>;
}
