export {};

declare module 'obsidian' {
  /**
   * A dropdown control with a fixed set of options.
   *
   * @since 1.13.0
   */
  interface SettingDropdownControl<K extends string = string> extends SettingControlBase<string, K> {
    /**
     * The selectable options as a value-to-label map.
     *
     * @official
     * @since 1.13.0
     */
    options: Record<string, string>;

    /**
     * Discriminant identifying this control as a dropdown.
     *
     * @official
     * @since 1.13.0
     */
    type: 'dropdown';
  }
}
