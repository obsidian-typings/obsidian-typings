export {};

declare module 'obsidian' {
  /**
   * Sanitize HTML to a DOM fragment.
   *
   * @param html - The HTML to sanitize.
   * @returns The sanitized DOM fragment.
   *
   * @example
   * ```ts
   * console.log(sanitizeHTMLToDom('<div>foo</div>')); #document-fragment
   * ```
   *
   * @official
   */

  export function sanitizeHTMLToDom(html: string): DocumentFragment;
}
