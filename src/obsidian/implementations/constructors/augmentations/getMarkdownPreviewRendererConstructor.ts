import { MarkdownPreviewRenderer } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#MarkdownPreviewRenderer} constructor.
 *
 * @returns The {@link obsidian#MarkdownPreviewRenderer} constructor.
 *
 * @public
 * @unofficial
 */
export function getMarkdownPreviewRendererConstructor(): ExtractConstructor<MarkdownPreviewRenderer> {
  return MarkdownPreviewRenderer as ExtractConstructor<MarkdownPreviewRenderer>;
}
