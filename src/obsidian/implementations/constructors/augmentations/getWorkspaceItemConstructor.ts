import { WorkspaceItem } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#WorkspaceItem} constructor.
 *
 * @returns The {@link obsidian#WorkspaceItem} constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceItemConstructor(): ExtractConstructor<WorkspaceItem> {
  return WorkspaceItem as unknown as ExtractConstructor<WorkspaceItem>;
}
