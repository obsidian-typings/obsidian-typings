import type { MarkdownPostProcessorContext } from 'obsidian';

/**
 * Handler function for post processing a code block
 */
export type CodeBlockPostProcessorHandler = (
    source: string,
    el: HTMLElement,
    ctx: MarkdownPostProcessorContext
) => Promise<void> | void;
