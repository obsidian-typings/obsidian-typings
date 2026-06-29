export {};

declare module 'obsidian' {
  /**
   * The scope stack tracked for a single window by {@link Keymap}.
   */
  export interface KeymapWindowStack {
    /**
     * The previously active scopes, most-recent last.
     *
     * @unofficial
     */
    prevScopes: Scope[];

    /**
     * The currently active scope for the window.
     *
     * @unofficial
     */
    scope: Scope;
  }
}
