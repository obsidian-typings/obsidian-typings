export {};

declare module 'obsidian' {
  /**
   * A group of entries in a {@link BasesQueryResult}, keyed by a grouping value.
   */
  export interface BasesQueryResultGroup {
    /**
     * The entries belonging to the group.
     *
     * @unofficial
     */
    entries: BasesEntry[];

    /**
     * The value the group is keyed by.
     *
     * @unofficial
     */
    key: Value;
  }
}
