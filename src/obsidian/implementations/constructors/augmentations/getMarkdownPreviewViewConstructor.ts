import {
    MarkdownPreviewView
} from 'obsidian';
import type { MarkdownPreviewViewConstructor } from '../../../internals/constructors/augmentations/MarkdownPreviewViewConstructor.ts';

/**
 * Get the MarkdownPreviewView constructor.
 *
 * @returns The MarkdownPreviewView constructor.
 *
 * @public
 * @unofficial
 */
export function getMarkdownPreviewViewConstructor(): MarkdownPreviewViewConstructor {
    return MarkdownPreviewView as MarkdownPreviewViewConstructor;
}
