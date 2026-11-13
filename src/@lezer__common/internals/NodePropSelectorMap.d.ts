/**
 * A mapping from selectors to prop values.
 *
 * @public
 * @unofficial
 */
export interface NodePropSelectorMap<T> {
  /** A selector mapped to its prop value. */
  [selector: string]: T;
}
