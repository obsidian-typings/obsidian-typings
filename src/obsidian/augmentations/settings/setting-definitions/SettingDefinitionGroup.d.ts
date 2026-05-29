export {};

declare module 'obsidian' {
  /**
   * A group of settings rendered under a shared heading. Used as an inline
   * group in the array returned by `getSettingDefinitions()`. For collections
   * of mutable data (with add/delete/reorder affordances), use
   * {@link SettingDefinitionList} instead.
   *
   * @since 1.13.0
   */
  interface SettingDefinitionGroup<K extends string = string> {
    /**
     * CSS classes to add to the group element.
     *
     * @official
     * @since 1.13.0
     */
    cls?: string;

    /**
     * Extra button configuration for the header.
     *
     * @official
     * @since 1.13.0
     * @deprecated - Added only for typing purposes. Use {@link extraButtons} instead.
     */
    extraButtons__?: ((component: ExtraButtonComponent) => unknown)[];

    /**
     * Heading text displayed above the group.
     *
     * @official
     * @since 1.13.0
     */
    heading?: string;

    /**
     * Settings within this group.
     *
     * @official
     * @since 1.13.0
     */
    items?: SettingGroupItem<K>[];

    /**
     * Discriminant identifying this item as a group (or its list subtype).
     *
     * @official
     * @since 1.13.0
     */
    type: 'group' | 'list';

    /**
     * Controls whether the group is rendered. `false` or `() => false` hides
     * it entirely (heading, controls, and items). Evaluated on each render.
     *
     * @default `true`
     * @official
     * @since 1.13.0
     */
    visible?: (() => boolean) | boolean;

    /**
     * Search component configuration for the header.
     *
     * @official
     * @since 1.13.0
     * @deprecated - Added only for typing purposes. Use {@link search} instead.
     */
    search__?(component: SearchComponent): unknown;
  }
}
