import type { StateField } from '@codemirror/state';

export {};

declare module 'obsidian' {
  /**
   * This is now deprecated - it is now mapped directly to {@link editorInfoField}, which return a {@link MarkdownFileInfo}, which may be a {@link MarkdownView} but not necessarily.
   *
   * @official
   * @deprecated - use {@link editorInfoField} instead.
   * @deprecated - Added only for typing purposes. Use {@link editorViewField} instead.
   */
  const editorViewField__: StateField<MarkdownFileInfo>;
}
