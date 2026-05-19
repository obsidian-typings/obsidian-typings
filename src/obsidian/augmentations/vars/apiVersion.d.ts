export {};

declare module 'obsidian' {
  /**
   * This is the API version of the app, which follows the release cycle of the desktop app.
   * Example: '0.13.21'
   *
   * @official
   * @deprecated - Added only for typing purposes. Use {@link apiVersion} instead.
   */
  let apiVersion__: string;
}
