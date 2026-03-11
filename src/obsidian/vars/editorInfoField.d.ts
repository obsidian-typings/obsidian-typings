import type { StateField } from '@codemirror/state';

export {};

declare module 'obsidian' {
  /**
   * Use this `CodeMirror` {@link StateField} to get {@link MarkdownFileInfo} about this Markdown editor, such as the associated file, or the Editor.
   *
   * @official
   * @deprecated - Added only for typing purposes. Use {@link editorInfoField} instead.
   */
  const editorInfoField__: StateField<MarkdownFileInfo>;
}
