import type {
    ImageValue,
    WorkspaceLeaf
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The ImageValue constructor.
 *
 * @public
 * @unofficial
 */
export interface ImageValueConstructor extends ConstructorBase<[leaf: WorkspaceLeaf], ImageValue> {}
