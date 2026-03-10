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
     * The metadata (frontmatter/properties) editor for this file.
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
    file__?(): null | TFile;
  }
}
