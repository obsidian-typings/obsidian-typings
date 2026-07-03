import { MarkdownRenderer } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#MarkdownRenderer} constructor.
 *
 * @returns The {@link obsidian#MarkdownRenderer} constructor.
 *
 * @public
 * @unofficial
 */
export function getMarkdownRendererConstructor(): ExtractConstructor<MarkdownRenderer> {
  return MarkdownRenderer as unknown as ExtractConstructor<MarkdownRenderer>;
}
