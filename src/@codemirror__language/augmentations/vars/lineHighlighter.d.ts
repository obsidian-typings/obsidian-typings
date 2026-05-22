import type { Extension } from '@codemirror/state';

export {};

declare module '@codemirror/language' {
  /**
   * This extension installs a highlighter that highlights lines based on `lineClassNodeProp`
   * and `tokenClassNodeProp`.
   *
   * @see {@link https://github.com/lishid/cm-language/blob/main/src/stream-parser.ts}
   * @remark This only exists and can only be used in Obsidian.
   * @unofficial
   */
  const lineHighlighter: Extension;
}
