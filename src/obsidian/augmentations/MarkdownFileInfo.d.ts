import type { MetadataEditor } from '../internals/MetadataEditor.d.ts';

declare module 'obsidian' {
    /**
     * The markdown file info.
     */
    interface MarkdownFileInfo extends HoverParent {
        /**
         * The Obsidian app instance.
         *
         * @official
         */
        app: App;

        /**
         * The editor associated with the markdown edit view.
         *
         * @example
         * ```ts
         * console.log(markdownFileInfo.editor);
         * ```
         * @official
         */
        editor?: Editor;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        metadataEditor?: MetadataEditor;

        /**
         * The associated file.
         *
         * @example
         * ```ts
         * console.log(markdownFileInfo.file);
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link file} instead.
         */
        file__?(): TFile | null;
    }
}
