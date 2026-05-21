import type { StateField } from '@codemirror/state';
import type { EditorView } from '@codemirror/view';

export {};

declare module 'obsidian' {
  /**
   * Use this `CodeMirror` {@link @codemirror/state#StateField} to get a reference to the {@link @codemirror/view#EditorView}
   *
   * @official
   * @deprecated - Added only for typing purposes. Use {@link obsidian#editorEditorField} instead.
   */
  const editorEditorField__: StateField<EditorView>;
}
