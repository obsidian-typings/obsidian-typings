import { WorkspaceMobileDrawer } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the WorkspaceMobileDrawer constructor.
 *
 * @returns The WorkspaceMobileDrawer constructor.
 * @remark Constructor is `null`. See {@link https://forum.obsidian.md/t/api-bug-tasks-class/98993}.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceMobileDrawerConstructor(): ExtractConstructor<WorkspaceMobileDrawer> {
  return WorkspaceMobileDrawer as ExtractConstructor<WorkspaceMobileDrawer>;
}
