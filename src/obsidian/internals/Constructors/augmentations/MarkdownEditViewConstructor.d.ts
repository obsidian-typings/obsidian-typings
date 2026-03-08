import type {
    MarkdownEditView,
    MarkdownView
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The MarkdownEditView constructor.
 *
 * @public
 * @unofficial
 */
export interface MarkdownEditViewConstructor extends ConstructorBase<[view: MarkdownView], MarkdownEditView> {}
