import { WorkspaceRibbon } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#WorkspaceRibbon} constructor.
 *
 * @returns The {@link obsidian#WorkspaceRibbon} constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceRibbonConstructor(): ExtractConstructor<WorkspaceRibbon> {
  return WorkspaceRibbon as ExtractConstructor<WorkspaceRibbon>;
}
