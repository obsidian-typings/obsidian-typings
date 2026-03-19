export {};

declare global {
  /**
   * The actively focused Window object. This is usually the same as `window` but
   * it will be different when using popout windows.
   *
   * @official
   * @deprecated - Added only for typing purposes. Use {@link activeWindow} instead.
   */
  var activeWindow__: Window;
}
