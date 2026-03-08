import type { MarkdownPreviewRenderer } from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The MarkdownPreviewRenderer constructor.
 *
 * @public
 * @unofficial
 */
export interface MarkdownPreviewRendererConstructor extends ConstructorBase<[owner: unknown, containerEl: HTMLElement, parentEl: HTMLElement, workerPath: unknown, observeInsertion?: boolean], MarkdownPreviewRenderer> {}
