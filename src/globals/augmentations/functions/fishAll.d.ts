export {};

declare global {
  /**
   * Finds all elements that match the selector.
   *
   * @param selector - The selector to find the elements with.
   * @returns An array of all elements that match the selector.
   * @example
   * ```ts
   * function element = document.body.createEl('p');
   * element.createEl('strong', { cls: 'foo' });
   * element.createEl('strong', { cls: 'foo' });
   * console.log(fishAll('.foo')); // [<strong class="foo"></strong>, <strong class="foo"></strong>]
   * console.log(fishAll('.bar')); // []
   * ```
   * @official
   */
  function fishAll(selector: string): HTMLElement[];
}
