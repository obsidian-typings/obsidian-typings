import {
  BasesQueryResult
} from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the BasesQueryResult constructor.
 *
 * @returns The BasesQueryResult constructor.
 *
 * @public
 * @unofficial
 */
export function getBasesQueryResultConstructor(): ExtractConstructor<BasesQueryResult> {
  return BasesQueryResult as ExtractConstructor<BasesQueryResult>;
}
