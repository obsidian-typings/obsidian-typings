export {};

declare global {
  /**
   * Creates a new element.
   *
   * @typeParam K - The type of the element to create.
   * @param tag - The tag name of the element to create.
   * @param o - The options object.
   * @param callback - A callback function to be called when the element is created.
   * @returns The created element.
   * @example
   * ```ts
   * createEl('p', { text: 'foo' }, (p) => {
   *     p.createEl('strong', { text: 'bar' });
   * });
   * ```
   * @official
   */
  function createEl<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    o?: DomElementInfo | string,
    callback?: (el: HTMLElementTagNameMap[K]) => void
  ): HTMLElementTagNameMap[K];
}
