import type { CodeBlockPostProcessorHandler } from '../internals/CodeBlockPostProcessorHandler.d.ts';

declare module 'obsidian' {
    /**
     * The renderer of the markdown preview.
     */
    interface MarkdownPreviewRenderer {}

    namespace MarkdownPreviewRenderer {
        /**
         * The currently registered code block post processors.
         *
         * @unofficial
         */
        const codeBlockPostProcessors: Record<string, CodeBlockPostProcessorHandler>;
        /**
         * Create a code block post processor.
         *
         * @param language - The language of the code block.
         * @param handler - The handler of the code block.
         * @param ctx - The context of the code block post processor.
         * @returns The code block post processor.
         *
         * @official
         * @deprecated - Added only for typing purposes. Use {@link createCodeBlockPostProcessor} instead.
         */
        function createCodeBlockPostProcessor__(
            language: string,
            handler: (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => Promise<any> | void
        ): (el: HTMLElement, ctx: MarkdownPostProcessorContext) => void;

        /**
         * Register a post processor.
         *
         * @param postProcessor - The post processor to register.
         * @param sortOrder - The sort order of the post processor.
         *
         * @official
         * @deprecated - Added only for typing purposes. Use {@link registerPostProcessor} instead.
         */
        function registerPostProcessor__(postProcessor: MarkdownPostProcessor, sortOrder?: number): void;

        /**
         * Remove the code block post processor currently registered with the given language.
         *
         * @param language - The language to unregister the post processor for.
         *
         * @remark Views will not reflect the removal until being re-rendered.
         * @unofficial
         */
        function unregisterCodeBlockPostProcessor(language: string): void;

        /**
         * Unregister a post processor.
         *
         * @param postProcessor - The post processor to unregister.
         *
         * @official
         * @deprecated - Added only for typing purposes. Use {@link unregisterPostProcessor} instead.
         */
        function unregisterPostProcessor__(postProcessor: MarkdownPostProcessor): void;
    }
}
