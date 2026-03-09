import {
  MarkdownView
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type MarkdownViewConstructor = ExtractConstructor<MarkdownView>;

/**
 * Get the MarkdownView constructor.
 *
 * @returns The MarkdownView constructor.
 *
 * @public
 * @unofficial
 */
export function getMarkdownViewConstructor(): MarkdownViewConstructor {
  return MarkdownView as MarkdownViewConstructor;
}
