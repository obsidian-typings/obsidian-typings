export {};

declare module 'obsidian' {
  /**
   * Union of all control types supported by a {@link SettingDefinitionControl}.
   *
   * @deprecated - Added only for typing purposes. Use {@link SettingControl} instead.
   * @since 1.13.0
   */
  type SettingControl__<K extends string = string> =
    | SettingColorControl<K>
    | SettingDropdownControl<K>
    | SettingFileControl<K>
    | SettingFolderControl<K>
    | SettingNumberControl<K>
    | SettingSecretControl<K>
    | SettingSliderControl<K>
    | SettingTextAreaControl<K>
    | SettingTextControl<K>
    | SettingToggleControl<K>;
}
