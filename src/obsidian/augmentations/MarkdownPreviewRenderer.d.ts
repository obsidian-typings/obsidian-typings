import type { CodeBlockPostProcessorHandler } from '../internals/CodeBlockPostProcessorHandler.js';

declare module 'obsidian' {
    namespace MarkdownPreviewRenderer {
        /**
         * The currently registered code block post processors
         */
        export const codeBlockPostProcessors: Record<
            string,
            CodeBlockPostProcessorHandler
        >;
        /**
         * Remove the code block post processor currently registered with the given language
         * @remark Views will not reflect the removal until being re-rendered
         */
        export function unregisterCodeBlockPostProcessor(
            language: string
        ): void;
    }
}
