import type {
    MarkdownPreviewView,
    MarkdownView
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The MarkdownPreviewView constructor.
 *
 * @public
 * @unofficial
 */
export interface MarkdownPreviewViewConstructor extends ConstructorBase<[view: MarkdownView], MarkdownPreviewView> {}
