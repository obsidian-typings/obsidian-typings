export {};

declare module 'obsidian' {
  /**
   * A setting definition that renders an action row (clickable button or link).
   *
   * @since 1.13.0
   */
  interface SettingDefinitionAction extends SettingDefinitionBase {
    /**
     * Forbidden discriminant key — set only on {@link SettingDefinitionControl}.
     *
     * @official
     * @since 1.13.0
     */
    control?: never;

    /**
     * Disables the row. Evaluated on each render. Call `update()` on the
     * setting tab to re-evaluate.
     *
     * @official
     * @since 1.13.0
     */
    disabled?: (() => boolean) | boolean;

    /**
     * Forbidden discriminant key — set only on {@link SettingDefinitionRender}.
     *
     * @official
     * @since 1.13.0
     */
    render?: never;

    /**
     * Callback invoked when the action setting is clicked. Receives the row's
     * current index within its parent group or list.
     *
     * @official
     * @since 1.13.0
     * @deprecated - Added only for typing purposes. Use {@link action} instead.
     */
    action__?(index: number): void;
  }
}
