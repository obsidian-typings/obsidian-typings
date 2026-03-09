import {
    MarkdownRenderer
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type MarkdownRendererConstructor = ExtractConstructor<MarkdownRenderer>;

/**
 * Get the MarkdownRenderer constructor.
 *
 * @returns The MarkdownRenderer constructor.
 *
 * @public
 * @unofficial
 */
export function getMarkdownRendererConstructor(): MarkdownRendererConstructor {
    return MarkdownRenderer as unknown as MarkdownRendererConstructor;
}
