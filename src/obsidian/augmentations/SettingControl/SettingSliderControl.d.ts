export {};

declare module 'obsidian' {
  /**
   * A slider control bound to a numeric value.
   *
   * @since 1.13.0
   */
  interface SettingSliderControl<K extends string = string> extends SettingControlBase<number, K> {
    /**
     * Maximum permitted value.
     *
     * @official
     * @since 1.13.0
     */
    max: number;

    /**
     * Minimum permitted value.
     *
     * @official
     * @since 1.13.0
     */
    min: number;

    /**
     * Step granularity between adjacent values.
     *
     * @official
     * @since 1.13.0
     */
    step: number;

    /**
     * Discriminant identifying this control as a slider.
     *
     * @official
     * @since 1.13.0
     */
    type: 'slider';
  }
}
