/**
 * Configuration for custom element handling in DOMPurify.
 *
 * @public
 * @unofficial
 */
export interface CustomElementHandling {
  /** Whether to allow customized built-in elements. */
  allowCustomizedBuiltInElements?: boolean;
  /** Check function or regex for allowed attribute names. */
  attributeNameCheck?: ((attributeName: string) => boolean) | null | RegExp;
  /** Check function or regex for allowed tag names. */
  tagNameCheck?: ((tagName: string) => boolean) | null | RegExp;
}
