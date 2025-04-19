import type { CodeBlockPostProcessorHandler } from '../internals/CodeBlockPostProcessorHandler.d.ts';

declare module 'obsidian' {
    interface MarkdownPreviewRenderer {}

    namespace MarkdownPreviewRenderer {
        /**
         * The currently registered code block post processors.
         */
        export const codeBlockPostProcessors: Record<string, CodeBlockPostProcessorHandler>;
        /**
         * Remove the code block post processor currently registered with the given language.
         *
         * @param language - The language to unregister the post processor for.
         *
         * @remark Views will not reflect the removal until being re-rendered.
         */
        export function unregisterCodeBlockPostProcessor(language: string): void;
    }
}
