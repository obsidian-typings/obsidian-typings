export {};

declare module 'obsidian' {
    /**
     * A data object for `obsidian://` URLs.
     *
     * @example
     * `obsidian://foo?bar=baz&qux=true`
     */
    interface ObsidianProtocolData {
        /**
         * The action to perform.
         *
         * @example
         * ```ts
         * console.log(obsidianProtocolData.action); // foo
         * ```
         * @official
         */
        action: string;

        /**
         * Additional parameters.
         *
         * @example
         * ```ts
         * console.log(obsidianProtocolData['bar']); // baz
         * console.log(obsidianProtocolData['qux']); // true
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use `this[key]` instead.
         */
        index__: string | 'true';
    }
}
