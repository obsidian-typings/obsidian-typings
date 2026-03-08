import type { MarkdownRenderChild } from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The MarkdownRenderChild constructor.
 *
 * @public
 * @unofficial
 */
export interface MarkdownRenderChildConstructor extends ConstructorBase<[containerEl: HTMLElement], MarkdownRenderChild> {}
