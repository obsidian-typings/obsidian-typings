export {};

declare module 'obsidian' {
  /**
   * A single item in the array returned by `getSettingDefinitions()`.
   *
   * @deprecated - Added only for typing purposes. Use {@link SettingDefinitionItem} instead.
   * @since 1.13.0
   */
  type SettingDefinitionItem__<K extends string = string> =
    | SettingDefinition<K>
    | SettingDefinitionGroup<K>
    | SettingDefinitionList<K>
    | SettingDefinitionPage<K>;
}
