export {};

declare module 'obsidian' {
  /**
   * A single-line text input control.
   *
   * @since 1.13.0
   */
  interface SettingTextControl<K extends string = string> extends SettingControlBase<string, K> {
    /**
     * Placeholder text shown when the input is empty.
     *
     * @official
     * @since 1.13.0
     */
    placeholder?: string;

    /**
     * Discriminant identifying this control as a text input.
     *
     * @official
     * @since 1.13.0
     */
    type: 'text';
  }
}
