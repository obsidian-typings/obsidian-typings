export {};

declare global {
  /**
   * Finds the first element that matches the selector.
   *
   * @param selector - The selector to find the element with.
   * @returns The first element that matches the selector, or `null` if no match is found.
   * @example
   * ```ts
   * function element = document.body.createEl('p');
   * element.createEl('strong', { cls: 'foo' });
   * console.log(fish('.foo')); // <strong class="foo"></span>
   * console.log(fish('.bar')); // null
   * ```
   * @official
   */
  function fish(selector: string): HTMLElement | null;
}
