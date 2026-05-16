import type { EditorState } from './EditorState.d.ts';
import type { Extension } from './Extension.d.ts';
import type { StateField } from './StateField.d.ts';
import type { Transaction } from './Transaction.d.ts';

/**
 * Configuration for defining a state field.
 *
 * @public
 * @unofficial
 */
export interface StateFieldSpec<Value> {
  /**
   * Compare two values of this field.
   *
   * @param a - The first value.
   * @param b - The second value.
   * @returns Whether the values are equal.
   */
  compare?: (a: Value, b: Value) => boolean;

  /**
   * Create the initial value for this field.
   *
   * @param state - The editor state.
   * @returns The initial value.
   */
  create(state: EditorState): Value;

  /**
   * Provide extensions based on this field.
   *
   * @param field - The state field.
   * @returns The extension.
   */
  provide?: (field: StateField<Value>) => Extension;

  /**
   * Compute a new value from the field's previous value and a transaction.
   *
   * @param value - The previous value.
   * @param transaction - The transaction.
   * @returns The updated value.
   */
  update(value: Value, transaction: Transaction): Value;
}
