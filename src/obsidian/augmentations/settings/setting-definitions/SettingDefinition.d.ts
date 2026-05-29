export {};

declare module 'obsidian' {
  /**
   * Union of the non-grouping setting definition shapes that may appear inside
   * a {@link SettingDefinitionGroup} or at the top level.
   *
   * @deprecated - Added only for typing purposes. Use {@link SettingDefinition} instead.
   * @since 1.13.0
   */
  type SettingDefinition__<K extends string = string> =
    | SettingDefinitionAction
    | SettingDefinitionControl<K>
    | SettingDefinitionEmpty
    | SettingDefinitionRender;
}
