export {};

declare module 'obsidian' {
  /**
   * A single item within a {@link SettingDefinitionGroup} — either a setting
   * or a navigable page.
   *
   * @deprecated - Added only for typing purposes. Use {@link SettingGroupItem} instead.
   * @since 1.13.0
   */
  type SettingGroupItem__<K extends string = string> =
    | SettingDefinition<K>
    | SettingDefinitionPage<K>;
}
