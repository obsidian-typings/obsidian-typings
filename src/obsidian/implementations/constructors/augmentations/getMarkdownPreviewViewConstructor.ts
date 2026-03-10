import {
  MarkdownPreviewView
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the MarkdownPreviewView constructor.
 *
 * @returns The MarkdownPreviewView constructor.
 *
 * @public
 * @unofficial
 */
export function getMarkdownPreviewViewConstructor(): ExtractConstructor<MarkdownPreviewView> {
  return MarkdownPreviewView as unknown as ExtractConstructor<MarkdownPreviewView>;
}
