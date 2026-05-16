import type { BlockType } from '@codemirror/view';

export {};

declare module '@codemirror/view' {
  interface BlockInfo {
    /**
     * The start of the element in the document.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link from} instead.
     */
    readonly from__: number;

    /**
     * Its height.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link height} instead.
     */
    readonly height__: number;

    /**
     * The length of the element.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link length} instead.
     */
    readonly length__: number;

    /**
     * The top position of the element (relative to the top of the document).
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link top} instead.
     */
    readonly top__: number;

    /**
     * The bottom position of the element.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link bottom} instead.
     */
    get bottom__(): number;

    /**
     * The end of the element as a document position.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link to} instead.
     */
    get to__(): number;

    /**
     * The type of element this is.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link type} instead.
     */
    get type__(): BlockType | readonly BlockInfo[];

    /**
     * If this is a widget block, this will return the widget associated with it.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link widget} instead.
     */
    get widget__(): null | WidgetType;

    /**
     * If this is a text block, this holds the number of line breaks that appear in widgets
     * inside the block.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link widgetLineBreaks} instead.
     */
    get widgetLineBreaks__(): number;
  }
}
