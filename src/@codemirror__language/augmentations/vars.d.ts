import type {
  Extension,
  Facet
} from '@codemirror/state';

import type { NodeProp } from '../../@lezer__common/internals/NodeProp.d.ts';

export {};

declare module '@codemirror/language' {
  /**
   * A facet that specifies token types for which spellcheck should be ignored.
   *
   * @see {@link https://github.com/lishid/cm-language/blob/main/src/stream-parser.ts}
   * @remark This only exists and can only be used in Obsidian.
   * @unofficial
   */
  const ignoreSpellcheckToken: Facet<string, string[]>;

  /**
   * The {@link NodeProp} that holds the CSS class of corresponding line-mode token.
   *
   * @see {@link https://github.com/lishid/cm-language/blob/main/src/stream-parser.ts}
   * @remark This only exists and can only be used in Obsidian.
   * @unofficial
   */
  const lineClassNodeProp: NodeProp<string>;

  /**
   * This extension installs a highlighter that highlights lines based on `lineClassNodeProp`
   * and `tokenClassNodeProp`.
   *
   * @see {@link https://github.com/lishid/cm-language/blob/main/src/stream-parser.ts}
   * @remark This only exists and can only be used in Obsidian.
   * @unofficial
   */
  const lineHighlighter: Extension;

  /**
   * The {@link NodeProp} that holds the CSS class of corresponding line-level token.
   *
   * @see {@link https://github.com/lishid/cm-language/blob/main/src/stream-parser.ts}
   * @remark This only exists and can only be used in Obsidian.
   * @unofficial
   */
  const tokenClassNodeProp: NodeProp<string>;
}
