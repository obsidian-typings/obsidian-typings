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
     */
    // eslint-disable-next-line @typescript-eslint/method-signature-style -- Property syntax required by official API for declaration merging.
    action: () => void;
  }
}
