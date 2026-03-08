import {
    MarkdownEditView
} from 'obsidian';
import type { MarkdownEditViewConstructor } from '../../../internals/Constructors/augmentations/MarkdownEditViewConstructor.ts';

/**
 * Get the MarkdownEditView constructor.
 *
 * @returns The MarkdownEditView constructor.
 *
 * @public
 * @unofficial
 */
export function getMarkdownEditViewConstructor(): MarkdownEditViewConstructor {
    return MarkdownEditView as unknown as MarkdownEditViewConstructor;
}
