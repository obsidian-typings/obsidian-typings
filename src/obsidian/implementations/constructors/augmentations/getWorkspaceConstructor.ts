import { Workspace } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#Workspace} constructor.
 *
 * @returns The {@link obsidian#Workspace} constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceConstructor(): ExtractConstructor<Workspace> {
  return Workspace as ExtractConstructor<Workspace>;
}
