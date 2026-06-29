export {};

declare module 'obsidian' {
  /**
   * Serialized state of a {@link WorkspaceRibbon}.
   */
  export interface RibbonState {
    /**
     * Map of ribbon item ID to whether it is hidden.
     *
     * @unofficial
     */
    hiddenItems: Record<string, boolean>;
  }
}
