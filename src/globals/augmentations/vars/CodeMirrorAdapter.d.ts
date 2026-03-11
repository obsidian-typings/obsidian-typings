import type { CodeMirrorAdapterEx } from '../../../@codemirror__view/internals/CodeMirrorAdapterEx.d.ts';

declare global {
  /**
   * CodeMirror adapter providing CM5-compatible API over CM6.
   * @unofficial
   */
  const CodeMirrorAdapter: CodeMirrorAdapterEx;
}
