import type {
  FormulaContext,
  Value
} from 'obsidian';

import type { FormulaFunctionParam } from './FormulaFunctionParam.d.ts';

/**
 * A Bases formula function, such as `now()` or the `contains()` of a string.
 *
 * A plugin adds its own with {@link obsidian#Plugin.registerGlobalFunc} or {@link obsidian#Plugin.registerInstanceFunc}.
 * The built-in functions derive from a base class that is not exported, so a plugin implements every member,
 * including {@link FormulaFunction.applyWithContext}, which is the one the evaluator calls.
 *
 * @public
 * @unofficial
 */
export interface FormulaFunction {
  /** The context of the evaluation in progress, set by {@link FormulaFunction.applyWithContext} and `null` outside it. */
  ctx: FormulaContext | null;

  /** The description shown in the formula autocomplete, or a function returning it. */
  docString?: (() => string) | string;

  /** The name of the function. It is matched case-insensitively, and registering a name again replaces the previous function. */
  name: string;

  /**
   * The parameters of the function. For an instance function, the first parameter is the value the function is called on.
   */
  params: FormulaFunctionParam[];

  /**
   * Evaluates the function.
   *
   * @param args - The arguments, one per parameter, checked against {@link FormulaFunctionParam."type"}. An omitted optional argument is `null`.
   * @returns The result of the function.
   */
  apply(...args: (null | Value)[]): Value;

  /**
   * Evaluates the function in a formula context: sets {@link FormulaFunction.ctx}, calls {@link FormulaFunction.apply}, then resets it.
   *
   * @param ctx - The context of the evaluation.
   * @param args - The arguments, one per parameter. An omitted optional argument is `null`.
   * @returns The result of the function.
   */
  applyWithContext(ctx: FormulaContext, ...args: (null | Value)[]): Value;

  /**
   * Serializes a call to the function back to formula source.
   *
   * @param args - The serialized arguments.
   * @returns The formula source of the call, `name(arg1, arg2)` for a global function.
   */
  serialize(...args: string[]): string;
}
