import {
    MarkdownRenderChild
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type MarkdownRenderChildConstructor = ExtractConstructor<MarkdownRenderChild>;

/**
 * Get the MarkdownRenderChild constructor.
 *
 * @returns The MarkdownRenderChild constructor.
 *
 * @public
 * @unofficial
 */
export function getMarkdownRenderChildConstructor(): MarkdownRenderChildConstructor {
    return MarkdownRenderChild as MarkdownRenderChildConstructor;
}
