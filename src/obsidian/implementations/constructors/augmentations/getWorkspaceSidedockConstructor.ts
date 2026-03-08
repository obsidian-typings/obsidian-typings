import {
    WorkspaceSidedock
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the WorkspaceSidedock constructor.
 *
 * @returns The WorkspaceSidedock constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceSidedockConstructor(): ExtractConstructor<WorkspaceSidedock> {
    return WorkspaceSidedock as ExtractConstructor<WorkspaceSidedock>;
}
