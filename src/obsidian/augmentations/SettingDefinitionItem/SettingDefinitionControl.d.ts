export {};

declare module 'obsidian' {
  /**
   * A setting definition that renders a single bound control.
   *
   * @since 1.13.0
   */
  interface SettingDefinitionControl<K extends string = string> extends SettingDefinitionBase {
    /**
     * Forbidden discriminant key — set only on {@link SettingDefinitionAction}.
     *
     * @official
     * @since 1.13.0
     */
    action?: never;

    /**
     * The control bound to a single setting key.
     *
     * @official
     * @since 1.13.0
     */
    control: SettingControl<K>;

    /**
     * Forbidden discriminant key — set only on {@link SettingDefinitionRender}.
     *
     * @official
     * @since 1.13.0
     */
    render?: never;
  }
}
