import type { CodeMirrorModule } from '../../../codemirror/internals/CodeMirrorModule.d.ts';

export {};

declare global {
  /**
   * Global CodeMirror 5 instance.
   *
   * @unofficial
   */
  var CodeMirror: CodeMirrorModule;
}
