import type { StateField } from '@codemirror/state';
import type { EditorView } from '@codemirror/view';

export {};

declare module 'obsidian' {
  /**
   * Use this `CodeMirror` {@link StateField} to get a reference to the {@link EditorView}
   *
   * @official
   * @deprecated - Added only for typing purposes. Use {@link editorEditorField} instead.
   */
  const editorEditorField__: StateField<EditorView>;
}
