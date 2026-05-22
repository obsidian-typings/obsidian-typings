/**
 * Sanitization profile options for DOMPurify.
 *
 * @public
 * @unofficial
 */
export interface ConfigUseProfiles {
  /** Whether to allow HTML elements. */
  html?: boolean;
  /** Whether to allow MathML elements. */
  mathMl?: boolean;
  /** Whether to allow SVG elements. */
  svg?: boolean;
  /** Whether to allow SVG filter elements. */
  svgFilters?: boolean;
}
