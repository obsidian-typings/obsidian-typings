export {};

declare module 'obsidian' {
  /**
   * A declarative page of settings rendered as a navigable entry.
   * Used as an inline page in the array returned by `getSettingDefinitions()`.
   *
   * @since 1.13.0
   */
  interface SettingDefinitionPage<K extends string = string> {
    /**
     * Description shown on the navigable entry.
     *
     * @official
     * @since 1.13.0
     */
    desc?: DocumentFragment | string;

    /**
     * Surfaces the current value on the entry, so the user can see it without
     * opening the page where it is edited. Call `update()` on the setting tab
     * to refresh it after the value changes.
     *
     * @official
     * @since 1.13.1
     */
    displayValue?: (() => string) | string;

    /**
     * Inline items rendered as a declarative sub-page. Can include groups
     * and nested pages. Mutually exclusive with `page`.
     *
     * @official
     * @since 1.13.0
     */
    items?: SettingDefinitionItem<K>[];

    /**
     * Display name shown as the navigable entry and page title.
     *
     * @official
     * @since 1.13.0
     */
    name: string;

    /**
     * Adds a status indicator to the entry. Use `'warning'` when the value on
     * the page needs the user's attention. Call `update()` on the setting tab
     * to refresh it after the underlying state changes.
     *
     * @official
     * @since 1.13.1
     */
    status?: 'warning' | (() => 'warning' | null) | null;

    /**
     * Discriminant identifying this item as a page.
     *
     * @official
     * @since 1.13.0
     */
    type: 'page';

    /**
     * Controls whether the page link is rendered. `false` or `() => false`
     * hides the navigable entry. Evaluated on each render.
     *
     * @default `true`
     * @official
     * @since 1.13.0
     */
    visible?: (() => boolean) | boolean;

    /**
     * Factory for a custom {@link SettingPage} subclass. Use this when the
     * sub-page is rendered imperatively rather than from a list of
     * definitions. Mutually exclusive with {@link items}. The factory is called
     * each time the page is opened.
     *
     * @official
     * @since 1.13.0
     * @deprecated - Added only for typing purposes. Use {@link page} instead.
     */
    page__?(): SettingPage;
  }
}
