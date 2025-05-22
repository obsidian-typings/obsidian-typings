export {};

declare module '@codemirror/view' {
    /**
     * Widgets added to the content are described by subclasses of this
     * class. Using a description object like that makes it possible to
     * delay creating of the DOM structure for a widget until it is
     * needed, and to avoid redrawing widgets even if the decorations
     * that define them are recreated.
     */
    interface WidgetType {
        /**
         * Setting this to true causes widgets to never be reused. The default
         * implementation just returns `false`.
         *
         * @see https://github.com/lishid/cm-view/blob/main/src/decoration.ts
         * @remark This only exists and can only be used in Obsidian.
         * @unofficial
         */
        get noReuse(): boolean;

        /**
         * Called when a previous DOM element created by a widget of the
         * same type is about to be reused. Equivalent to `updateDOM`, but
         * for when `eq` returns true.
         *
         * Can be used as widget ownership transfer.
         *
         * @see https://github.com/lishid/cm-view/blob/main/src/decoration.ts
         * @remark This only exists and can only be used in Obsidian.
         * @unofficial
         */
        become(dom: HTMLElement, widget: WidgetType): void;
    }
}
