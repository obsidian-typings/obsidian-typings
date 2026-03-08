import {
    MarkdownRenderChild
} from 'obsidian';
import type { MarkdownRenderChildConstructor } from '../../../internals/constructors/augmentations/MarkdownRenderChildConstructor.d.ts';

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
