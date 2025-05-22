export {};

declare module '@codemirror/language' {
    /**
     * Encapsulates a single line of input. Given to stream syntax code,
     * which uses it to tokenize the content.
     */
    interface StringStream {
        /**
         * @see https://github.com/lishid/cm-language/blob/main/src/stringstream.ts
         * @todo Documentation incomplete.
         * @remark This only exists and can only be used in Obsidian.
         * @unofficial
         */
        lookAhead: (n: number) => string;
    }
}