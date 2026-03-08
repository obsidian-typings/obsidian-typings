import type { MarkdownView } from 'obsidian';
import type { TypedViewConstructor } from './TypedViewConstructor.d.ts';

/**
 * Constructor for creating MarkdownView instances.
 * @public
 * @unofficial
 */
export interface MarkdownViewConstructor extends TypedViewConstructor<MarkdownView> {}
