import '@codemirror/language';
import type {
    Extension,
    Facet
} from '@codemirror/state';
import type { NodeProp } from '@lezer/common';

export {};

declare module '@codemirror/language' {
    /**
     * @see https://github.com/lishid/cm-language/blob/main/src/stream-parser.ts
     * @todo Documentation incomplete.
     * @remark This only exists and can only be used in Obsidian.
     * @unofficial
     */
    const ignoreSpellcheckToken: Facet<string, string[]>;

    /**
     * The `NodeProp` that holds the CSS class of corresponding line-mode token.
     *
     * @see https://github.com/lishid/cm-language/blob/main/src/stream-parser.ts
     * @remark This only exists and can only be used in Obsidian.
     * @unofficial
     */
    const lineClassNodeProp: NodeProp<string>;

    /**
     * This extension installs a highlighter that highlights lines based on `lineClassNodeProp`
     * and `tokenClassNodeProp`.
     *
     * @see https://github.com/lishid/cm-language/blob/main/src/stream-parser.ts
     * @remark This only exists and can only be used in Obsidian.
     * @unofficial
     */
    const lineHighlighter: Extension;

    /**
     * The `NodeProp` that holds the CSS class of corresponding line-level token.
     *
     * @see https://github.com/lishid/cm-language/blob/main/src/stream-parser.ts
     * @remark This only exists and can only be used in Obsidian.
     * @unofficial
     */
    const tokenClassNodeProp: NodeProp<string>;
}
