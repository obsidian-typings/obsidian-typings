import {
  MarkdownPreviewRenderer
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type MarkdownPreviewRendererConstructor = ExtractConstructor<MarkdownPreviewRenderer>;

/**
 * Get the MarkdownPreviewRenderer constructor.
 *
 * @returns The MarkdownPreviewRenderer constructor.
 *
 * @public
 * @unofficial
 */
export function getMarkdownPreviewRendererConstructor(): MarkdownPreviewRendererConstructor {
  return MarkdownPreviewRenderer as MarkdownPreviewRendererConstructor;
}
