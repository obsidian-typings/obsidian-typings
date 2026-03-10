import {
  MarkdownRenderChild
} from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the MarkdownRenderChild constructor.
 *
 * @returns The MarkdownRenderChild constructor.
 *
 * @public
 * @unofficial
 */
export function getMarkdownRenderChildConstructor(): ExtractConstructor<MarkdownRenderChild> {
  return MarkdownRenderChild as ExtractConstructor<MarkdownRenderChild>;
}
