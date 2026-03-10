import {
  MarkdownView
} from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the MarkdownView constructor.
 *
 * @returns The MarkdownView constructor.
 *
 * @public
 * @unofficial
 */
export function getMarkdownViewConstructor(): ExtractConstructor<MarkdownView> {
  return MarkdownView as ExtractConstructor<MarkdownView>;
}
