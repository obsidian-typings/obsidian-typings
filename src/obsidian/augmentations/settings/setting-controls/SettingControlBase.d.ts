export {};

declare module 'obsidian' {
  /**
   * Common configuration for every {@link SettingControl}.
   *
   * @since 1.13.0
   */
  interface SettingControlBase<V, K extends string = string> {
    /**
     * Fallback when the resolver returns `undefined`/`null`.
     *
     * @official
     * @since 1.13.0
     */
    defaultValue?: V;

    /**
     * Disables the control. Evaluated on each render, so a function form can
     * reflect runtime state (e.g. whether another plugin is installed). Call
     * `update()` on the setting tab to re-evaluate after the underlying state
     * changes.
     *
     * @official
     * @since 1.13.0
     */
    disabled?: (() => boolean) | boolean;

    /**
     * The config/storage property name passed to `getControlValue` and
     * `setControlValue` on the setting tab.
     *
     * @official
     * @since 1.13.0
     */
    key: K;

    /**
     * Validate a candidate value before it is persisted. Return a non-empty
     * string to reject the change and surface it as an inline error message
     * below the setting; return void/empty/`undefined` to accept and persist.
     *
     * Primarily intended for text-bearing controls (`text`, `textarea`,
     * `number`, `file`, `folder`) where the user can enter values the bind's
     * type alone can't constrain.
     *
     * The stored value may already be invalid when the setting is rendered
     * (e.g. data from a previous version of your plugin). The framework
     * runs `validate` once on mount and shows the message if the seeded
     * value fails; it does not modify or replace the stored value. Plugins
     * that need to enforce invariants on stored data should validate again
     * when reading their settings.
     *
     * @official
     * @since 1.13.0
     * @deprecated - Added only for typing purposes. Use {@link validate} instead.
     */
    validate__?(value: V): Promise<string | void> | string | void;
  }
}
