export {};

declare module 'obsidian' {
  /**
   * A handler for `obsidian://` URLs.
   *
   * @param params - The parameters of the `obsidian://` URL.
   * @returns The result of the handler. The result is discarded. Usually it's `void` or `Promise<void>`.
   *
   * @deprecated - Added only for typing purposes. Use {@link obsidian#ObsidianProtocolHandler} instead.
   */
  type ObsidianProtocolHandler__ = (params: ObsidianProtocolData) => unknown;
}
