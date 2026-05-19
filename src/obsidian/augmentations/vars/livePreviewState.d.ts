import type { ViewPlugin } from '@codemirror/view';

export {};

declare module 'obsidian' {
  /**
   * `CodeMirror` {@link ViewPlugin} for `Live Preview`.
   *
   * @official
   * @deprecated - Added only for typing purposes. Use {@link livePreviewState} instead.
   */
  const livePreviewState__: ViewPlugin<LivePreviewStateType, undefined>;
}
