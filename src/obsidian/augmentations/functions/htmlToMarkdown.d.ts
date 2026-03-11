export {};

declare module 'obsidian' {
  /**
   * Converts HTML to a Markdown string.
   *
   * @example
   * ```ts
   * console.log(htmlToMarkdown('<h1>foo</h1>')); // # foo
   * const el = createDiv();
   * el.createEl('h2', { text: 'bar' });
   * console.log(htmlToMarkdown(el)); // ## bar
   * const fragment = createFragment();
   * fragment.createEl('h3', { text: 'baz' });
   * console.log(htmlToMarkdown(fragment)); // ### baz
   * ```
   *
   * @official
   */

  export function htmlToMarkdown(html: Document | DocumentFragment | HTMLElement | string): string;
}
