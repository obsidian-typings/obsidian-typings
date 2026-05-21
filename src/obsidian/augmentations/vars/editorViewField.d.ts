import type { StateField } from '@codemirror/state';

export {};

declare module 'obsidian' {
  /**
   * This is now deprecated - it is now mapped directly to {@link obsidian#editorInfoField}, which return a {@link obsidian#MarkdownFileInfo}, which may be a {@link obsidian#MarkdownView} but not necessarily.
   *
   * @official
   * @deprecated - use {@link obsidian#editorInfoField} instead.
   * @deprecated - Added only for typing purposes. Use {@link obsidian#editorViewField} instead.
   */
  const editorViewField__: StateField<MarkdownFileInfo>;
}
