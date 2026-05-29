export {};

declare module 'obsidian' {
  /**
   * Common configuration shared by every concrete {@link SettingDefinition}.
   *
   * @since 1.13.0
   */
  interface SettingDefinitionBase {
    /**
     * Additional search terms.
     *
     * @official
     * @since 1.13.0
     */
    aliases?: string[];

    /**
     * Description text or fragment. Used for rendering; the textContent of a
     * fragment is used for search.
     *
     * @official
     * @since 1.13.0
     */
    desc?: DocumentFragment | string;

    /**
     * Display name — used for rendering and search.
     *
     * @official
     * @since 1.13.0
     */
    name: string;

    /**
     * Controls search visibility. `false` or `() => false` excludes from search.
     *
     * @default `true`
     * @official
     * @since 1.13.0
     */
    searchable?: (() => boolean) | boolean;

    /**
     * Controls whether the item is rendered. `false` or `() => false` hides
     * the item and also excludes it from search for that render cycle.
     * Evaluated on each render; call `update()` on the setting tab to
     * re-evaluate after the underlying state changes.
     *
     * @default `true`
     * @official
     * @since 1.13.0
     */
    visible?: (() => boolean) | boolean;
  }
}
