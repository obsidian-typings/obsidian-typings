import {
  MarkdownRenderer
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the MarkdownRenderer constructor.
 *
 * @returns The MarkdownRenderer constructor.
 *
 * @public
 * @unofficial
 */
export function getMarkdownRendererConstructor(): ExtractConstructor<MarkdownRenderer> {
  return MarkdownRenderer as unknown as ExtractConstructor<MarkdownRenderer>;
}
