import {
  WorkspaceSplit
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type WorkspaceSplitConstructor = ExtractConstructor<WorkspaceSplit>;

/**
 * Get the WorkspaceSplit constructor.
 *
 * @returns The WorkspaceSplit constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceSplitConstructor(): WorkspaceSplitConstructor {
  return WorkspaceSplit as WorkspaceSplitConstructor;
}
