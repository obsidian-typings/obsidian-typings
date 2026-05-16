import type { ChangeDesc } from './ChangeDesc.d.ts';
import type { StateEffect } from './StateEffect.d.ts';

/**
 * Representation of a type of state effect.
 *
 * @public
 * @unofficial
 */
export declare class StateEffectType<Value> {
  /** The map function for this effect type. */
  readonly map: (value: Value, mapping: ChangeDesc) => undefined | Value;

  /**
   * Create a state effect of this type.
   *
   * @param value - The effect value.
   * @returns The created state effect.
   */
  of(value: Value): StateEffect<Value>;
}
