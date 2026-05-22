import type { ChangeDesc } from '@codemirror/state';

/**
 * Configuration for defining a state effect type.
 *
 * @public
 * @unofficial
 */
export interface StateEffectDefineSpec<Value> {
  /**
   * A function to map the effect value through position changes.
   *
   * @param value - The effect value.
   * @param mapping - The change description.
   * @returns The mapped value, or `undefined`.
   */
  map?(value: Value, mapping: ChangeDesc): undefined | Value;
}
