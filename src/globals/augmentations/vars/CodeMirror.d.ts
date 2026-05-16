import type { CodeMirrorModule } from '../../../codemirror/internals/CodeMirrorModule.d.ts';

export {};

declare global {
  /**
   * Global CodeMirror 5 instance.
   *
   * @unofficial
   * @deprecated - Added only for typing purposes. Use {@link CodeMirror} instead.
   */
  var CodeMirror__: CodeMirrorModule;
}
