import type {
    Workspace,
    WorkspaceSidedock
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The WorkspaceSidedock constructor.
 *
 * @public
 * @unofficial
 */
export interface WorkspaceSidedockConstructor extends ConstructorBase<[workspace: Workspace, direction: string, side: string, id?: string], WorkspaceSidedock> {}
