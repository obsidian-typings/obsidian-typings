export {};

declare module 'obsidian' {
  /**
   * Configuration for a {@link SettingDefinitionList}'s `addItem` affordance.
   *
   * @since 1.13.0
   */
  interface SettingDefinitionAddItem {
    /**
     * Mobile row label and desktop button tooltip.
     *
     * @official
     * @since 1.13.0
     */
    name: string;

    /**
     * Called when the affordance is clicked or tapped.
     *
     * @official
     * @since 1.13.0
     * @deprecated - Added only for typing purposes. Use {@link action} instead.
     */
    action__?(): void;
  }
}
