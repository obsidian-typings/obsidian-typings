import {
  Workspace
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the Workspace constructor.
 *
 * @returns The Workspace constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceConstructor(): ExtractConstructor<Workspace> {
  return Workspace as ExtractConstructor<Workspace>;
}
