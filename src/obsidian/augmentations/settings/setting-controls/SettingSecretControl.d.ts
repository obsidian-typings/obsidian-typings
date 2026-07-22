export {};

declare module 'obsidian' {
  /**
   * Links the setting to a secret stored in SecretStorage. Persists the secret's
   * key (a string reference), not the secret itself; the value is read from and
   * managed through `app.secretStorage`.
   *
   * @since 1.13.2
   */
  interface SettingSecretControl<K extends string = string> extends SettingControlBase<string, K> {
    /**
     * Discriminant identifying this control as a secret control.
     *
     * @since 1.13.2
     * @official
     */
    type: 'secret';
  }
}
