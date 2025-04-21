export {};

declare module 'obsidian' {
    /**
     * Event reference
     */
    interface EventRef {
        /**
         * Context applied to the event callback.
         *
         * @unofficial
         */
        ctx?: unknown;

        /**
         * Events object the event was registered on.
         *
         * @unofficial
         */
        e: Events;

        /**
         * Event name the event was registered on.
         *
         * @unofficial
         */
        name: string;

        /**
         * Function to be called on event trigger on the events object.
         *
         * @unofficial
         */
        fn(...arg: unknown[]): void;
    }
}
