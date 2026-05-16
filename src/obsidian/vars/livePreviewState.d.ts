import type { ViewPlugin } from '../../@codemirror__view/internals/ViewPlugin.d.ts';

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
