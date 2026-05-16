import type { StateField } from '../../@codemirror__state/internals/StateField.d.ts';

export {};

declare module 'obsidian' {
  /**
   * Use this `CodeMirror` {@link StateField} to check whether `Live Preview` is active
   *
   * @official
   * @deprecated - Added only for typing purposes. Use {@link editorLivePreviewField} instead.
   */
  const editorLivePreviewField__: StateField<boolean>;
}
