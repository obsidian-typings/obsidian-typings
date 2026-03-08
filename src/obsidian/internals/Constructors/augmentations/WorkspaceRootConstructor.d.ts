import type {
    Workspace,
    WorkspaceRoot
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The WorkspaceRoot constructor.
 *
 * @public
 * @unofficial
 */
export interface WorkspaceRootConstructor extends ConstructorBase<[workspace: Workspace, direction: string, id?: string], WorkspaceRoot> {}
