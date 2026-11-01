import type {
  Constructor,
  Value
} from 'obsidian';

/**
 * A parameter of a Bases {@link FormulaFunction}.
 *
 * @public
 * @unofficial
 */
export interface FormulaFunctionParam {
  /**
   * The widget the filter editor shows for this parameter, overriding the one derived from {@link FormulaFunctionParam."type"}.
   * The built-in functions use `file`, `folder`, `property`, `tags` and `text`.
   */
  customWidget?: string;

  /** The name of the parameter, shown in the formula autocomplete. */
  name: string;

  /** Whether the parameter may be omitted. An omitted or `null` argument is passed to `apply` as `null`. */
  optional?: boolean;

  /**
   * The value classes the argument may be an instance of. An argument that is an instance of none of them is a type error,
   * and the first entry names the expected type in that error.
   */
  type: Constructor<Value>[];

  /** Whether the parameter takes every remaining argument. Only the last parameter can be variadic. */
  variadic?: boolean;
}
