import type { StateField } from '@codemirror/state';

export {};

declare module 'obsidian' {
  /**
   * Use this `CodeMirror` {@link @codemirror/state#StateField} to check whether `Live Preview` is active
   *
   * @official
   * @deprecated - Added only for typing purposes. Use {@link obsidian#editorLivePreviewField} instead.
   */
  const editorLivePreviewField__: StateField<boolean>;
}
