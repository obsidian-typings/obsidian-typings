export {};

declare module 'obsidian' {
  /**
   * A folder-path input with a vault folder suggester. Persists the selected
   * folder's path (a string).
   *
   * @since 1.13.0
   */
  interface SettingFolderControl<K extends string = string> extends SettingControlBase<string, K> {
    /**
     * Whether the vault root is offered as a suggestion.
     *
     * @default `false`
     * @official
     * @since 1.13.0
     */
    includeRoot?: boolean;

    /**
     * Placeholder text shown when the input is empty.
     *
     * @official
     * @since 1.13.0
     */
    placeholder?: string;

    /**
     * Discriminant identifying this control as a folder input.
     *
     * @official
     * @since 1.13.0
     */
    type: 'folder';

    /**
     * Optional filter — only folders for which this returns truthy are suggested.
     *
     * @official
     * @since 1.13.0
     */
    // eslint-disable-next-line @typescript-eslint/method-signature-style -- Property syntax required by official API for declaration merging.
    filter?: (folder: TFolder) => boolean;
  }
}
