import {
    WorkspaceMobileDrawer
} from 'obsidian';
import type { WorkspaceMobileDrawerConstructor } from '../../../internals/Constructors/augmentations/WorkspaceMobileDrawerConstructor.ts';

/**
 * Get the WorkspaceMobileDrawer constructor.
 *
 * @returns The WorkspaceMobileDrawer constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceMobileDrawerConstructor(): WorkspaceMobileDrawerConstructor {
    return WorkspaceMobileDrawer as unknown as WorkspaceMobileDrawerConstructor;
}
