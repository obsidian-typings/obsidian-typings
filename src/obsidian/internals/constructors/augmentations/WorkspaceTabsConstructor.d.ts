import type {
    Workspace,
    WorkspaceTabs
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The WorkspaceTabs constructor.
 *
 * @public
 * @unofficial
 */
export interface WorkspaceTabsConstructor extends ConstructorBase<[workspace: Workspace, id?: string], WorkspaceTabs> {}
