/**
 * Specification for a mark decoration that styles a range of text.
 *
 * @public
 * @unofficial
 */
export interface MarkDecorationSpec {
  /** HTML attributes to add to the wrapping element. */
  attributes?: { [key: string]: string };

  /** CSS class to add to the wrapping element. */
  class?: string;

  /** Whether both sides of the decoration are inclusive. */
  inclusive?: boolean;

  /** Whether the end of the decoration is inclusive. */
  inclusiveEnd?: boolean;

  /** Whether the start of the decoration is inclusive. */
  inclusiveStart?: boolean;

  /** The HTML tag to wrap the text in. */
  tagName?: string;
}
