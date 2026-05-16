/**
 * Configuration options for DOMPurify sanitization.
 *
 * @public
 * @unofficial
 */
export interface Config {
  /** Additional attributes to allow. */
  ADD_ATTR?: string[];

  /** Additional data URI tags to allow. */
  ADD_DATA_URI_TAGS?: string[];

  /** Additional tags to allow. */
  ADD_TAGS?: string[];

  /** Additional URI-safe attributes to allow. */
  ADD_URI_SAFE_ATTR?: string[];

  /** Whether to allow ARIA attributes. */
  ALLOW_ARIA_ATTR?: boolean;

  /** Whether to allow data attributes. */
  ALLOW_DATA_ATTR?: boolean;

  /** Whether to allow unknown protocols in URLs. */
  ALLOW_UNKNOWN_PROTOCOLS?: boolean;

  /** List of allowed attributes. */
  ALLOWED_ATTR?: string[];

  /** List of allowed namespaces. */
  ALLOWED_NAMESPACES?: string[];

  /** List of allowed tags. */
  ALLOWED_TAGS?: string[];

  /** Regular expression for allowed URI patterns. */
  ALLOWED_URI_REGEXP?: RegExp;

  /** Custom element handling configuration. */
  CUSTOM_ELEMENT_HANDLING?: {
    tagNameCheck?: ((tagName: string) => boolean) | null | RegExp;
    attributeNameCheck?: ((attributeName: string) => boolean) | null | RegExp;
    allowCustomizedBuiltInElements?: boolean;
  };

  /** List of forbidden attributes. */
  FORBID_ATTR?: string[];

  /** List of forbidden content types. */
  FORBID_CONTENTS?: string[];

  /** List of forbidden tags. */
  FORBID_TAGS?: string[];

  /** Whether to force the use of the body element. */
  FORCE_BODY?: boolean;

  /** Whether to sanitize in place. */
  IN_PLACE?: boolean;

  /** Whether to keep content of removed elements. */
  KEEP_CONTENT?: boolean;

  /** Namespace for the parsed document. */
  NAMESPACE?: string;

  /** Media type for the parser. */
  PARSER_MEDIA_TYPE?: string;

  /** Whether to return a DOM node instead of a string. */
  RETURN_DOM?: boolean;

  /** Whether to return a DocumentFragment instead of a string. */
  RETURN_DOM_FRAGMENT?: boolean;

  /** Whether to import the returned DOM node into the current document. */
  RETURN_DOM_IMPORT?: boolean;

  /** Whether to return a Trusted Type object instead of a string. */
  RETURN_TRUSTED_TYPE?: boolean;

  /** Whether to enable safe-for-templates mode. */
  SAFE_FOR_TEMPLATES?: boolean;

  /** Whether to sanitize DOM clobbering attacks. */
  SANITIZE_DOM?: boolean;

  /** Whether to sanitize named properties. */
  SANITIZE_NAMED_PROPS?: boolean;

  /** Profiles to use for sanitization. */
  USE_PROFILES?: { mathMl?: boolean; svg?: boolean; svgFilters?: boolean; html?: boolean } | false;

  /** Whether to sanitize the whole document. */
  WHOLE_DOCUMENT?: boolean;
}
