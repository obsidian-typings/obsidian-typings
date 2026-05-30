import { BasesQueryResult } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#BasesQueryResult} constructor.
 *
 * @returns The {@link obsidian#BasesQueryResult} constructor.
 *
 * @public
 * @unofficial
 */
export function getBasesQueryResultConstructor(): ExtractConstructor<BasesQueryResult> {
  return BasesQueryResult as ExtractConstructor<BasesQueryResult>;
}
