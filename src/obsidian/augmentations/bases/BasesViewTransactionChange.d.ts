export {};

declare module 'obsidian' {
  /**
   * A single property change captured within a {@link BasesViewTransaction}.
   */
  export interface BasesViewTransactionChange {
    /**
     * The post-change frontmatter snapshot.
     *
     * @unofficial
     */
    end: unknown;

    /**
     * The file the change applies to.
     *
     * @unofficial
     */
    file: TFile;

    /**
     * The pre-change frontmatter snapshot.
     *
     * @unofficial
     */
    start: unknown;
  }
}
