export {};

declare module 'obsidian' {
  /**
   * A numeric input control.
   *
   * @since 1.13.0
   */
  interface SettingNumberControl<K extends string = string> extends SettingControlBase<number, K> {
    /**
     * Maximum permitted value.
     *
     * @official
     * @since 1.13.0
     */
    max?: number;

    /**
     * Minimum permitted value.
     *
     * @official
     * @since 1.13.0
     */
    min?: number;

    /**
     * Placeholder text shown when the input is empty.
     *
     * @official
     * @since 1.13.0
     */
    placeholder?: string;

    /**
     * Step granularity, or `'any'` for unconstrained stepping.
     *
     * @official
     * @since 1.13.0
     */
    step?: 'any' | number;

    /**
     * Discriminant identifying this control as a number input.
     *
     * @official
     * @since 1.13.0
     */
    type: 'number';
  }
}
