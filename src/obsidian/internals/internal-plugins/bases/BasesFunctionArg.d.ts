/**
 * Bases function argument.
 *
 * @public
 * @unofficial
 */
export interface BasesFunctionArg {
  /**
   * Whether to include custom types.
   */
  includeCustomTypes?: boolean;

  /**
   * The name of the argument.
   */
  name: string;

  /**
   * Whether the argument is optional.
   */
  optional?: boolean;

  /**
   * The types of the argument.
   */
  type: string[];

  /**
   * Whether the argument is variadic.
   */
  variadic?: boolean;
}
