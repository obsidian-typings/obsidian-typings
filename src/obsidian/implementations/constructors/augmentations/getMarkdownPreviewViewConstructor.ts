import {
  MarkdownPreviewView
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type MarkdownPreviewViewConstructor = ExtractConstructor<MarkdownPreviewView>;

/**
 * Get the MarkdownPreviewView constructor.
 *
 * @returns The MarkdownPreviewView constructor.
 *
 * @public
 * @unofficial
 */
export function getMarkdownPreviewViewConstructor(): MarkdownPreviewViewConstructor {
  return MarkdownPreviewView as unknown as MarkdownPreviewViewConstructor;
}
