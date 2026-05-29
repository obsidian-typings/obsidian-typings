export {};

declare module 'obsidian' {
  /**
   * A setting definition that renders only a heading row (name + description)
   * with no control, action, or custom render.
   *
   * @since 1.13.0
   */
  interface SettingDefinitionEmpty extends SettingDefinitionBase {
    /**
     * Forbidden discriminant key — set only on {@link SettingDefinitionAction}.
     *
     * @official
     * @since 1.13.0
     */
    action?: never;

    /**
     * Forbidden discriminant key — set only on {@link SettingDefinitionControl}.
     *
     * @official
     * @since 1.13.0
     */
    control?: never;

    /**
     * Forbidden discriminant key — set only on {@link SettingDefinitionRender}.
     *
     * @official
     * @since 1.13.0
     */
    render?: never;
  }
}
