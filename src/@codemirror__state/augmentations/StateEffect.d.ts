import type {
  ChangeDesc,
  Extension,
  StateEffectType
} from '@codemirror/state';

export {};

declare module '@codemirror/state' {
  interface StateEffect<Value> {
    /**
     * The value of this effect.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link value} instead.
     */
    readonly value__: Value;

    /**
     * Tells you whether this effect object is of a given type.
     *
     * @param type - The state effect type.
     * @returns Whether this effect is of the given type.
     * @official
     */
    is<T>(type: StateEffectType<T>): this is StateEffect<T>;

    /**
     * Map this effect through a position mapping. Will return `undefined` when that ends up
     * deleting the effect.
     *
     * @param mapping - The change description.
     * @returns The mapped effect, or `undefined`.
     * @official
     */
    map(mapping: ChangeDesc): StateEffect<Value> | undefined;
  }

  namespace StateEffect {
    /**
     * Define a new effect type.
     *
     * @param spec - The effect spec.
     * @param spec.map - The mapping function.
     * @returns The new effect type.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link StateEffect.define} instead.
     */
    function define__<Value = null>(spec?: { map?: (value: Value, mapping: ChangeDesc) => undefined | Value }): StateEffectType<Value>;

    /**
     * Map an array of effects through a change set.
     *
     * @param effects - The effects to map.
     * @param mapping - The change description.
     * @returns The mapped effects.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link StateEffect.mapEffects} instead.
     */
    function mapEffects__(effects: readonly StateEffect<unknown>[], mapping: ChangeDesc): readonly StateEffect<unknown>[];

    /**
     * This effect can be used to reconfigure the root extensions of the editor.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link StateEffect.reconfigure} instead.
     */
    const reconfigure__: StateEffectType<Extension>;

    /**
     * Append extensions to the top-level configuration of the editor.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link StateEffect.appendConfig} instead.
     */
    const appendConfig__: StateEffectType<Extension>;
  }
}
