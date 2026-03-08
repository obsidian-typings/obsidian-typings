import {
    WorkspaceSidedock
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type WorkspaceSidedockConstructor = ExtractConstructor<WorkspaceSidedock>;

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
