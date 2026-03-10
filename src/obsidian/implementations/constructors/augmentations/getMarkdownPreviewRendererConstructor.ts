import {
  MarkdownPreviewRenderer
} from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the MarkdownPreviewRenderer constructor.
 *
 * @returns The MarkdownPreviewRenderer constructor.
 *
 * @public
 * @unofficial
 */
export function getMarkdownPreviewRendererConstructor(): ExtractConstructor<MarkdownPreviewRenderer> {
  return MarkdownPreviewRenderer as ExtractConstructor<MarkdownPreviewRenderer>;
}
