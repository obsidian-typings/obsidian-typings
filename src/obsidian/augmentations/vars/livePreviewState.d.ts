import type { ViewPlugin } from '@codemirror/view';

export {};

declare module 'obsidian' {
  /**
   * `CodeMirror` {@link @codemirror/view#ViewPlugin} for `Live Preview`.
   *
   * @official
   * @deprecated - Added only for typing purposes. Use {@link obsidian#livePreviewState} instead.
   */
  const livePreviewState__: ViewPlugin<LivePreviewStateType, undefined>;
}
