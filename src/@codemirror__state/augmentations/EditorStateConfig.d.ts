import type {
  EditorSelection as CmEditorSelection,
  Extension,
  Text
} from '@codemirror/state';

export {};

declare module '@codemirror/state' {
  interface EditorStateConfig {
    /**
     * The initial document.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link doc} instead.
     */
    doc__?: string | Text;

    /**
     * Extension(s) to associate with this state.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link extensions} instead.
     */
    extensions__?: Extension;

    /**
     * The starting selection.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link selection} instead.
     */
    selection__?: { anchor: number; head?: number } | CmEditorSelection;
  }
}
