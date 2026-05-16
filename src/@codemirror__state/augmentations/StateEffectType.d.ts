export {};

declare module '@codemirror/state' {
  interface StateEffectType<Value> {
    /**
     * Create a state effect instance of this type.
     *
     * @param value - The effect value.
     * @returns The created state effect.
     * @official
     */
    of(value: Value): StateEffect<Value>;
  }
}
