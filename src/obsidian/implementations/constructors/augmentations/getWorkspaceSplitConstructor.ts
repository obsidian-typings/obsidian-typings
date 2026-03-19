import { WorkspaceSplit } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the WorkspaceSplit constructor.
 *
 * @returns The WorkspaceSplit constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceSplitConstructor(): ExtractConstructor<WorkspaceSplit> {
  return WorkspaceSplit as ExtractConstructor<WorkspaceSplit>;
}
