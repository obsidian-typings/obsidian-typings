export {};

declare global {
  /**
   * Creates a new document fragment.
   *
   * @param callback - A callback function to be called when the element is created.
   * @returns The created element.
   * @example
   * ```ts
   * createFragment((fragment) => {
   *     fragment.createEl('p', { text: 'foo' });
   * });
   * ```
   * @official
   */
  function createFragment(callback?: (el: DocumentFragment) => void): DocumentFragment;
}
