import type {
    Workspace,
    WorkspaceWindow
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The WorkspaceWindow constructor.
 *
 * @public
 * @unofficial
 */
export interface WorkspaceWindowConstructor extends ConstructorBase<[workspace: Workspace, id?: string, size?: Record<string, number>], WorkspaceWindow> {}
