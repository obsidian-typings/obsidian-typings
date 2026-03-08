import type {
    App,
    WorkspaceLeaf
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The WorkspaceLeaf constructor.
 *
 * @public
 * @unofficial
 */
export interface WorkspaceLeafConstructor extends ConstructorBase<[app: App, id?: string], WorkspaceLeaf> {}
