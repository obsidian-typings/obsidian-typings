export {};

declare global {
    /**
     * Information about HTMLElement event listener.
     */
    interface EventListenerInfo {
        /**
         * Wrapper function of the event listener.
         * @official
         */
        callback: Function;

        /**
         * The listener of the event.
         * @official
         */
        listener: Function;

        /**
         * The options of the event listener.
         * @official
         */
        options?: boolean | AddEventListenerOptions;

        /**
         * The selector of the event target.
         * @official
         */
        selector: string;
    }
}
