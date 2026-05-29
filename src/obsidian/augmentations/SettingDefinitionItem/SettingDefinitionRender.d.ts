export {};

declare module 'obsidian' {
  /**
   * A setting definition that renders its row imperatively.
   *
   * @since 1.13.0
   */
  interface SettingDefinitionRender extends SettingDefinitionBase {
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
     * Renders the setting row imperatively.
     *
     * May return a cleanup function, invoked before the row is torn down.
     * Not guaranteed to run when the host window is destroyed.
     *
     * @official
     * @since 1.13.0
     */
    // eslint-disable-next-line @typescript-eslint/method-signature-style -- Property syntax required by official API for declaration merging.
    render: (setting: Setting, group: SettingGroup) => (() => void) | void;
  }
}
