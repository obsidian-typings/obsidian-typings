import type { StateField } from '../../@codemirror__state/internals/StateField.d.ts';
import type { EditorView } from '../../@codemirror__view/internals/EditorView.d.ts';

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
