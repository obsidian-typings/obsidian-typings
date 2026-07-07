import type {
  ChangeSet,
  EditorState,
  Transaction
} from '@codemirror/state';

export {};

declare module '@codemirror/view' {
  interface ViewUpdate {
    /**
     * The changes made to the document by this update.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link changes} instead.
     */
    readonly changes__?: ChangeSet;

    /**
     * Whether the document changed in this update.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link docChanged} instead.
     */
    readonly docChanged__?: boolean;

    /**
     * True when this update indicates a focus change.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link focusChanged} instead.
     */
    readonly focusChanged__?: boolean;

    /**
     * Returns `true` when the document was modified or the size of the editor, or elements
     * within the editor, changed.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link geometryChanged} instead.
     */
    readonly geometryChanged__?: boolean;

    /**
     * Indicates whether the height of a block element in the editor changed in this update.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link heightChanged} instead.
     */
    readonly heightChanged__?: boolean;

    /**
     * Whether the selection was explicitly set in this update.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link selectionSet} instead.
     */
    readonly selectionSet__?: boolean;

    /**
     * The previous editor state.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link startState} instead.
     */
    readonly startState__?: EditorState;

    /**
     * The new editor state.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link state} instead.
     */
    readonly state__?: EditorState;

    /**
     * The transactions involved in the update. May be empty.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link transactions} instead.
     */
    readonly transactions__?: readonly Transaction[];

    /**
     * The editor view that the update is associated with.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link view} instead.
     */
    readonly view__?: EditorView;

    /**
     * Tells you whether the viewport or visible ranges changed in this update.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link viewportChanged} instead.
     */
    readonly viewportChanged__?: boolean;

    /**
     * Returns `true` when viewportChanged is `true` and the viewport change is not just the
     * result of mapping it in response to document changes.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link viewportMoved} instead.
     */
    readonly viewportMoved__?: boolean;
  }
}
