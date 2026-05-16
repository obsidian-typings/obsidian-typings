import type {
  EditorState,
  StateEffect,
  Transaction
} from '@codemirror/state';

export {};

declare module '@codemirror/view' {
  interface EditorViewConfig {
    /**
     * When given, the editor is immediately appended to the given element on creation.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link parent} instead.
     */
    parent__?: DocumentFragment | Element;

    /**
     * If the view is going to be mounted in a shadow root or document other than the one held
     * by the global variable `document`, you should pass it here.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link root} instead.
     */
    root__?: Document | ShadowRoot;

    /**
     * Pass an effect to set an initial scroll position.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link scrollTo} instead.
     */
    scrollTo__?: StateEffect<unknown>;

    /**
     * The view's initial state.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link state} instead.
     */
    state__?: EditorState;

    /**
     * Deprecated single-transaction version of `dispatchTransactions`.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link dispatch} instead.
     */
    dispatch__?: (tr: Transaction, view: EditorView) => void;

    /**
     * Override the way transactions are dispatched for this editor view.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link dispatchTransactions} instead.
     */
    dispatchTransactions__?: (trs: readonly Transaction[], view: EditorView) => void;
  }
}
