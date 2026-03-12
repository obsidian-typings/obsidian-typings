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
     * @unofficial ERROR: Missing `@unofficial` or `@official` tag
     */
    displayName: string;

    /**
     * The options contained in this group.
     *
     * @public
     * @since 1.10.0
     * @unofficial ERROR: Missing `@unofficial` or `@official` tag
     */
    items: T[];

    /**
     * Discriminant indicating this is a group container.
     *
     * @public
     * @since 1.10.0
     * @unofficial ERROR: Missing `@unofficial` or `@official` tag
     */
    type: 'group';

    /**
     * If provided, the group will be hidden if the function returns `true`.
     *
     * @public
     * @since 1.10.2
     * @param config - Read-only copy of the current view configuration.
     * @unofficial ERROR: Missing `@unofficial` or `@official` tag
     */
    shouldHide?: () => boolean;
  }
}
