import type { ChangeDesc } from './ChangeDesc.d.ts';
import type { StateEffectType } from './StateEffectType.d.ts';

/**
 * State effects can be used to represent additional effects associated with a transaction.
 *
 * @public
 * @unofficial
 */
export declare class StateEffect<Value> {
  /** The effect type. */
  readonly type: StateEffectType<Value>;

  /** The effect value. */
  readonly value: Value;

  /**
   * Test whether this effect is of a given type.
   *
   * @param type - The type to check.
   * @returns Whether this effect is of the given type.
   */
  is<T>(type: StateEffectType<T>): this is StateEffect<T>;

  /**
   * Map this effect through a change description.
   *
   * @param mapping - The change description to map through.
   * @returns The mapped effect, or `undefined` if the effect is deleted.
   */
  map(mapping: ChangeDesc): StateEffect<Value> | undefined;

  /**
   * Map an array of effects through a change description.
   *
   * @param effects - The effects to map.
   * @param mapping - The change description to map through.
   * @returns The mapped effects.
   */
  static mapEffects(effects: readonly StateEffect<unknown>[], mapping: ChangeDesc): readonly StateEffect<unknown>[];
}
