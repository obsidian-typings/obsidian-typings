export {};

declare global {
  /**
   * Creates a new `<span>` element.
   *
   * @param o - The options object.
   * @param callback - A callback function to be called when the element is created.
   * @returns The created element.
   * @example
   * ```ts
   * createSpan({ text: 'foo' }, (span) => {
   *     span.createEl('strong', { text: 'bar' });
   * });
   * ```
   * @official
   */
  function createSpan(o?: DomElementInfo | string, callback?: (el: HTMLSpanElement) => void): HTMLSpanElement;
}
