import {
    MarkdownRenderChild
} from 'obsidian';
import type { MarkdownRenderChildConstructor } from '../../../internals/Constructors/augmentations/MarkdownRenderChildConstructor.ts';

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
