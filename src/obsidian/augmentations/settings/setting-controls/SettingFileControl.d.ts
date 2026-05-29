export {};

declare module 'obsidian' {
  /**
   * A file-path input with a vault file suggester. Persists the selected
   * file's full path including extension (e.g. `folder/note.md`). Resolve the
   * saved path with `Vault.getFileByPath()`.
   *
   * @since 1.13.0
   */
  interface SettingFileControl<K extends string = string> extends SettingControlBase<string, K> {
    /**
     * Placeholder text shown when the input is empty.
     *
     * @official
     * @since 1.13.0
     */
    placeholder?: string;

    /**
     * Discriminant identifying this control as a file input.
     *
     * @official
     * @since 1.13.0
     */
    type: 'file';

    /**
     * Optional filter — only files for which this returns truthy are suggested.
     *
     * @official
     * @since 1.13.0
     * @deprecated - Added only for typing purposes. Use {@link filter} instead.
     */
    filter__?(file: TFile): boolean;
  }
}
