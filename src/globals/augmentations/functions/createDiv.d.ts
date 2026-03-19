export {};

declare global {
  /**
   * Creates a new `<div>` element.
   *
   * @param o - The options object.
   * @param callback - A callback function to be called when the element is created.
   * @returns The created element.
   * @example
   * ```ts
   * createDiv({ text: 'foo' }, (div) => {
   *     div.createEl('strong', { text: 'bar' });
   * });
   * ```
   * @official
   */
  function createDiv(o?: DomElementInfo | string, callback?: (el: HTMLDivElement) => void): HTMLDivElement;
}
