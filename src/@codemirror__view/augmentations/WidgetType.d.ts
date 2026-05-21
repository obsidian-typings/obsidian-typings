import type { Rect } from '@codemirror/view';

export {};

declare module '@codemirror/view' {
  interface WidgetType {
    /**
     * Called when a previous DOM element created by a widget of the
     * same type is about to be reused. Equivalent to `updateDOM`, but
     * for when `eq` returns `true`.
     *
     * Can be used as widget ownership transfer.
     *
     * @param dom - The DOM element being reused.
     * @param widget - The widget that previously owned the DOM element.
     * @see {@link https://github.com/lishid/cm-view/blob/main/src/decoration.ts}
     * @remark This only exists and can only be used in Obsidian.
     * @unofficial
     */
    become(dom: HTMLElement, widget: WidgetType): void;

    /**
     * Override the way screen coordinates for positions at/in the widget are found.
     *
     * @param dom - The DOM element.
     * @param pos - The offset into the widget.
     * @param side - The side of the position being queried.
     * @returns The rectangle or `null`.
     * @official
     */
    coordsAt(dom: HTMLElement, pos: number, side: number): null | Rect;

    /**
     * This is called when an instance of the widget is removed from the editor view.
     *
     * @param dom - The DOM element being removed.
     * @official
     */
    destroy(dom: HTMLElement): void;

    /**
     * The estimated height this widget will have, to be used when estimating the height of
     * content that hasn't been drawn. May return -1 to indicate you don't know.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link estimatedHeight} instead.
     */
    get estimatedHeight__(): number;

    /**
     * Can be used to configure which kinds of events inside the widget should be ignored by
     * the editor. The default is to ignore all events.
     *
     * @param event - The event.
     * @returns Whether to ignore the event.
     * @official
     */
    ignoreEvent(event: Event): boolean;

    /**
     * For inline widgets that are displayed inline and introduce line breaks, this must
     * indicate the amount of line breaks they introduce. Defaults to 0.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link lineBreaks} instead.
     */
    get lineBreaks__(): number;

    /**
     * Setting this to `true` causes widgets to never be reused. The default
     * implementation just returns `false`.
     *
     * @see {@link https://github.com/lishid/cm-view/blob/main/src/decoration.ts}
     * @remark This only exists and can only be used in Obsidian.
     * @unofficial
     */
    get noReuse(): boolean;
  }
}
