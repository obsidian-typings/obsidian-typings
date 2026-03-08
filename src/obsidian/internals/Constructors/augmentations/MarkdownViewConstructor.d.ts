import type {
    MarkdownView,
    WorkspaceLeaf
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The MarkdownView constructor.
 *
 * @public
 * @unofficial
 */
export interface MarkdownViewConstructor extends ConstructorBase<[leaf: WorkspaceLeaf], MarkdownView> {}
