export {};

declare module 'obsidian' {
  /**
   * A registered item in a {@link WorkspaceRibbon}.
   */
  export interface RibbonItem {
    /**
     * The rendered button element, once created.
     *
     * @unofficial
     */
    buttonEl?: HTMLElement;

    /**
     * Whether the item is hidden.
     *
     * @unofficial
     */
    hidden: boolean;

    /**
     * The lucide icon name for the item.
     *
     * @unofficial
     */
    icon: string;

    /**
     * The unique identifier of the item.
     *
     * @unofficial
     */
    id: string;

    /**
     * The tooltip title of the item.
     *
     * @unofficial
     */
    title: string;

    /**
     * Click handler for the ribbon item.
     *
     * @unofficial
     */
    callback(evt: MouseEvent): unknown;
  }
}
