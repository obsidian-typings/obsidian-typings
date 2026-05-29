export {};

declare module 'obsidian' {
  /**
   * A multi-line text input control. Persists a string.
   *
   * @since 1.13.0
   */
  interface SettingTextAreaControl<K extends string = string> extends SettingControlBase<string, K> {
    /**
     * Placeholder text shown when the input is empty.
     *
     * @official
     * @since 1.13.0
     */
    placeholder?: string;

    /**
     * Initial number of visible rows.
     *
     * @official
     * @since 1.13.0
     */
    rows?: number;

    /**
     * Discriminant identifying this control as a textarea.
     *
     * @official
     * @since 1.13.0
     */
    type: 'textarea';
  }
}
