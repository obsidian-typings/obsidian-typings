import type {
    FileValue,
    WorkspaceLeaf
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The FileValue constructor.
 *
 * @public
 * @unofficial
 */
export interface FileValueConstructor extends ConstructorBase<[leaf: WorkspaceLeaf], FileValue> {}
