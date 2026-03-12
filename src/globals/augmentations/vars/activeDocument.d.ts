export {};

declare global {
  /**
   * The actively focused Document object. This is usually the same as `document` but.
   * it will be different when using popout windows.
   *
   * @official
   * @deprecated - Added only for typing purposes. Use {@link activeDocument} instead.
   */
  var activeDocument__: Document;
}
