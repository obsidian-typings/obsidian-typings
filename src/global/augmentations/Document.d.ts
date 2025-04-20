export {};

declare global {
    /**
     * Augments the built-in {@link Document} interface.
     */
    interface Document {
        /**
         * The event listeners of the document.
         * @official
         */
        _EVENTS?: {
            [K in keyof DocumentEventMap]?: EventListenerInfo[];
        };

        /**
         * Removes an event listener from the document.
         *
         * @typeParam K - The type of the event to listen for.
         * @param this - The document to remove the event listener from.
         * @param type - The type of event to listen for.
         * @param selector - The selector of the event target.
         * @param listener - The listener to call when the event is triggered.
         * @param options - The options of the event listener.
         * @example
         * ```ts
         * document.off('click', 'div', document.body._EVENTS.click[0].listener);
         * ```
         * @official
         */
        off<K extends keyof DocumentEventMap>(
            this: Document,
            type: K,
            selector: string,
            listener: (this: Document, ev: DocumentEventMap[K], delegateTarget: HTMLElement) => any,
            options?: boolean | AddEventListenerOptions
        ): void;

        /**
         * Adds an event listener to the document.
         *
         * @typeParam K - The type of the event to listen for.
         * @param this - The document to add the event listener to.
         * @param type - The type of event to listen for.
         * @param selector - The selector of the event target.
         * @param listener - The listener to call when the event is triggered.
         * @param options - The options of the event listener.
         * @example
         * ```ts
         * document.on('click', 'div', (ev) => {
         *     console.log(ev);
         * });
         * ```
         * @official
         */
        on<K extends keyof DocumentEventMap>(
            this: Document,
            type: K,
            selector: string,
            listener: (this: Document, ev: DocumentEventMap[K], delegateTarget: HTMLElement) => any,
            options?: boolean | AddEventListenerOptions
        ): void;
    }
}
