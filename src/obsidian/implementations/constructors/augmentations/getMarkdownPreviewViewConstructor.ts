import { MarkdownPreviewView } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#MarkdownPreviewView} constructor.
 *
 * @returns The {@link obsidian#MarkdownPreviewView} constructor.
 *
 * @public
 * @unofficial
 */
export function getMarkdownPreviewViewConstructor(): ExtractConstructor<MarkdownPreviewView> {
  return MarkdownPreviewView as unknown as ExtractConstructor<MarkdownPreviewView>;
}
