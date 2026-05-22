import type { Facet } from '@codemirror/state';

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
}
