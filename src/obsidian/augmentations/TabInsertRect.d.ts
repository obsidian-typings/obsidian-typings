export {};

declare module 'obsidian' {
  /**
   * The rectangle marking where a dragged tab would be inserted, returned within {@link TabInsertLocation}.
   */
  export interface TabInsertRect {
    /**
     * The height of the rectangle, in pixels.
     *
     * @unofficial
     */
    height: number;

    /**
     * The width of the rectangle, in pixels.
     *
     * @unofficial
     */
    width: number;

    /**
     * The x coordinate of the rectangle, in pixels.
     *
     * @unofficial
     */
    x: number;

    /**
     * The y coordinate of the rectangle, in pixels.
     *
     * @unofficial
     */
    y: number;
  }
}
