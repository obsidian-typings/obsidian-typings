import type { NodeProp } from '../../../@lezer__common/internals/NodeProp.d.ts';

export {};

declare module '@codemirror/language' {
  /**
   * The {@link @lezer/common#NodeProp} that holds the CSS class of corresponding line-mode token.
   *
   * @see {@link https://github.com/lishid/cm-language/blob/main/src/stream-parser.ts}
   * @remark This only exists and can only be used in Obsidian.
   * @unofficial
   */
  const lineClassNodeProp: NodeProp<string>;
}
