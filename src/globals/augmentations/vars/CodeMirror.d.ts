export {};

declare global {
  /**
   * Global CodeMirror 5 instance.
   * @unofficial
   * @deprecated - Added only for typing purposes. Use {@link CodeMirror} instead.
   */
  var CodeMirror__: typeof import('codemirror');
}
