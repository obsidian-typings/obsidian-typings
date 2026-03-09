import {
  WorkspaceRibbon
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type WorkspaceRibbonConstructor = ExtractConstructor<WorkspaceRibbon>;

/**
 * Get the WorkspaceRibbon constructor.
 *
 * @returns The WorkspaceRibbon constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceRibbonConstructor(): WorkspaceRibbonConstructor {
  return WorkspaceRibbon as WorkspaceRibbonConstructor;
}
