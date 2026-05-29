export {};

declare module 'obsidian' {
  /**
   * A boolean toggle control.
   *
   * @since 1.13.0
   */
  interface SettingToggleControl<K extends string = string> extends SettingControlBase<boolean, K> {
    /**
     * Discriminant identifying this control as a toggle.
     *
     * @official
     * @since 1.13.0
     */
    type: 'toggle';
  }
}
