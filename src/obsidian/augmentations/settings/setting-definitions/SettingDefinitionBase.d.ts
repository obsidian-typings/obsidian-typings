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
     * Disables the row: adds `is-disabled` to the setting element and propagates
     * to every component registered on it. Evaluated on each render; call
     * `refreshDomState()` on the setting tab to re-evaluate in place.
     *
     * Takes precedence over the `disabled` of a {@link SettingDefinitionControl}'s
     * own control. Precedence is decided by key presence, so setting this to
     * `undefined` explicitly still suppresses that fallback.
     *
     * @unofficial
     * @since 1.13.0
     */
    disabled?: (() => boolean) | boolean;

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
