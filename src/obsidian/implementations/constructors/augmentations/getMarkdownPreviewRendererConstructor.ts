import {
    MarkdownPreviewRenderer
} from 'obsidian';
import type { MarkdownPreviewRendererConstructor } from '../../../internals/constructors/augmentations/MarkdownPreviewRendererConstructor.ts';

/**
 * Get the MarkdownPreviewRenderer constructor.
 *
 * @returns The MarkdownPreviewRenderer constructor.
 *
 * @public
 * @unofficial
 */
export function getMarkdownPreviewRendererConstructor(): MarkdownPreviewRendererConstructor {
    return MarkdownPreviewRenderer as MarkdownPreviewRendererConstructor;
}
