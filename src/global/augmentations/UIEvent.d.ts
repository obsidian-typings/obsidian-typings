export {};

declare global {
    /**
     * Augments the built-in {@link UIEvent} interface.
     */
    interface UIEvent extends Event {
        /**
         * The document of the event.
         * @official
         */
        doc: Document;

        /**
         * The target node of the event.
         * @official
         */
        targetNode: Node | null;

        /**
         * The window of the event.
         * @official
         */
        win: Window;

        /**
         * Cross-window capable instanceof check, a drop-in replacement.
         * for instanceof checks on UIEvents.
         *
         * @typeParam T - The type to check.
         * @param type - The type to check.
         * @returns Whether the event is an instance of the type.
         * @example
         * ```ts
         * if (event.instanceOf(MouseEvent)) {
         *     console.log('event is a mouse event');
         * }
         * ```
         * @official
         */
        instanceOf<T>(type: {
            new(...data: any[]): T;
        }): this is T;
    }
}
