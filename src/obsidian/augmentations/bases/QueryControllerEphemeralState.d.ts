export {};

declare module 'obsidian' {
  /**
   * The ephemeral (non-persisted) state of a {@link QueryController}, keyed by view name.
   */
  export interface QueryControllerEphemeralState {
    /**
     * Per-view ephemeral state, keyed by view name.
     *
     * @unofficial
     */
    views: Record<string, unknown>;
  }
}
