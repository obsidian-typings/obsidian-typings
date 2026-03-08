import {
    WorkspaceSidedock
} from 'obsidian';
import type { WorkspaceSidedockConstructor } from '../../../internals/constructors/augmentations/WorkspaceSidedockConstructor.ts';

/**
 * Get the WorkspaceSidedock constructor.
 *
 * @returns The WorkspaceSidedock constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceSidedockConstructor(): WorkspaceSidedockConstructor {
    return WorkspaceSidedock as WorkspaceSidedockConstructor;
}
