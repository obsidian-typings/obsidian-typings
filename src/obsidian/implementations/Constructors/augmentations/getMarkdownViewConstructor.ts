import {
    MarkdownView
} from 'obsidian';
import type { MarkdownViewConstructor } from '../../../internals/Constructors/augmentations/MarkdownViewConstructor.ts';

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
