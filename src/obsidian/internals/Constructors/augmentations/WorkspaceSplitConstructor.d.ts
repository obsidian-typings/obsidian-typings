import type {
    Workspace,
    WorkspaceSplit
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The WorkspaceSplit constructor.
 *
 * @public
 * @unofficial
 */
export interface WorkspaceSplitConstructor extends ConstructorBase<[workspace: Workspace, direction: string, id?: string], WorkspaceSplit> {}
