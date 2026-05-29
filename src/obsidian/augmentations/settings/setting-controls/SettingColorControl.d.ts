export {};

declare module 'obsidian' {
  /**
   * A color picker control bound to a {@link HexString} value.
   *
   * @since 1.13.0
   */
  interface SettingColorControl<K extends string = string> extends SettingControlBase<HexString, K> {
    /**
     * Discriminant identifying this control as a color picker.
     *
     * @official
     * @since 1.13.0
     */
    type: 'color';
  }
}
