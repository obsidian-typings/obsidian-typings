import type { default as CodeMirrorInstance } from 'codemirror';

declare global {
  /**
   * Global CodeMirror 5 instance.
   * @unofficial
   * @deprecated - Added only for typing purposes. Use {@link CodeMirror} instead.
   */
  const CodeMirror__: typeof CodeMirrorInstance;
}
