import { WorkspaceSplit } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#WorkspaceSplit} constructor.
 *
 * @returns The {@link obsidian#WorkspaceSplit} constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceSplitConstructor(): ExtractConstructor<WorkspaceSplit> {
  return WorkspaceSplit as ExtractConstructor<WorkspaceSplit>;
}
