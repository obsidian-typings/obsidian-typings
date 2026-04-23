export {};

declare module 'obsidian' {
  /**
   * Collapsible container for other ViewOptions.
   *
   * @typeParam T - The type of the options in the group.
   * @since 1.10.0
   */
  export interface BasesOptionGroup<T extends BasesOption> {
    /**
     * Display name of the option group.
     *
     * @public
     * @since 1.10.0
     * @official
     */
    displayName: string;

    /**
     * The options contained in this group.
     *
     * @public
     * @since 1.10.0
     * @official
     */
    items: T[];

    /**
     * Discriminant indicating this is a group container.
     *
     * @public
     * @since 1.10.0
     * @official
     */
    type: 'group';

    /**
     * If provided, the group will be hidden if the function returns `true`.
     *
     * @param config - Read-only copy of the current view configuration.
     * @returns Whether the group should be hidden.
     *
     * @public
     * @since 1.10.2
     * @official
     */
    shouldHide?(config?: BasesViewConfig): boolean;
  }
}
