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
    // eslint-disable-next-line obsidian-typings/require-optional-underscore-members -- This interface merges with a `[key: string]: string` index signature, so an optional member would be `string | undefined` and fail to satisfy the index type.
    index__: 'true' | string;
  }
}
