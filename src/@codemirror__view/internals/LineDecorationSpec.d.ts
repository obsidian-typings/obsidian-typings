/**
 * Specification for a line decoration that styles an entire line.
 *
 * @public
 * @unofficial
 */
export interface LineDecorationSpec {
  /** HTML attributes to add to the line element. */
  attributes?: { [key: string]: string };

  /** CSS class to add to the line element. */
  class?: string;
}
