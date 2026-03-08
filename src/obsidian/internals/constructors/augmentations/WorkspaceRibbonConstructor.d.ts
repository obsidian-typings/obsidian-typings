import type {
    Workspace,
    WorkspaceRibbon
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The WorkspaceRibbon constructor.
 *
 * @public
 * @unofficial
 */
export interface WorkspaceRibbonConstructor extends ConstructorBase<[workspace: Workspace, side: string], WorkspaceRibbon> {}
