/**
 * Configuration for creating a node prop.
 *
 * @public
 * @unofficial
 */
export interface NodePropConfig<T> {
  /** Whether this prop is stored per node rather than per type. */
  perNode?: boolean;

  /** A function to deserialize the prop value from a string. */
  deserialize?(str: string): T;
}
