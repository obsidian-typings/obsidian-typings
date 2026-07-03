import type { StateField } from '@codemirror/state';

export {};

declare module 'obsidian' {
  /**
   * Use this `CodeMirror` {@link @codemirror/state#StateField} to get {@link obsidian#MarkdownFileInfo} about this Markdown editor, such as the associated file, or the {@link obsidian#Editor}.
   *
   * @official
   * @deprecated - Added only for typing purposes. Use {@link obsidian#editorInfoField} instead.
   */
  const editorInfoField__: StateField<MarkdownFileInfo>;
}
