export {};

declare global {
  /**
   * Creates a new svg element such as `<svg>`, `<circle>`, `<rect>`, etc.
   *
   * @param tag - The tag name of the element to create.
   * @param o - The options object.
   * @param callback - A callback function to be called when the element is created.
   * @returns The created element.
   * @example
   * ```ts
   * createSvg('svg', { cls: 'foo bar' }, (svg) => {
   *     svg.createSvg('circle');
   * });
   * ```
   * @official
   */
  function createSvg<K extends keyof SVGElementTagNameMap>(
    tag: K,
    o?: string | SvgElementInfo,
    callback?: (el: SVGElementTagNameMap[K]) => void
  ): SVGElementTagNameMap[K];
}
