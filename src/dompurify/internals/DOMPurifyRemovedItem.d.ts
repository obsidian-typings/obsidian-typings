/**
 * An item removed by DOMPurify during sanitization.
 *
 * @public
 * @unofficial
 */
export interface DOMPurifyRemovedItem {
  /** The removed attribute, if applicable. */
  attribute?: Attr;
  /** The removed element, if applicable. */
  element?: Element;
}
